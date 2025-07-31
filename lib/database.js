// Database utilities for Redis - Persistent trade storage
import { createClient } from 'redis';

// Check if Redis is available
const REDIS_AVAILABLE = !!process.env.REDIS_URL;
console.log(`🗄️ Redis Available: ${REDIS_AVAILABLE}`);

// Create Redis client
let redisClient = null;
if (REDIS_AVAILABLE) {
  redisClient = createClient({
    url: process.env.REDIS_URL
  });
  redisClient.on('error', (err) => console.log('Redis Client Error', err));
}

const TRADES_KEY = 'dexy:trades';
const TOKENS_KEY = 'dexy:tokens';
const STATS_KEY = 'dexy:stats';
const MAX_TRADES = 150; // Keep only 150 most recent trades

export class DexyDatabase {
  // Get all trades from database (sorted by timestamp, newest first)
  static async getTrades() {
    if (!REDIS_AVAILABLE) {
      console.log('⚠️ Redis not available, returning empty trades array');
      return [];
    }
    
    try {
      if (!redisClient.isOpen) {
        await redisClient.connect();
      }
      
      const tradesData = await redisClient.get(TRADES_KEY);
      const trades = tradesData ? JSON.parse(tradesData) : [];
      console.log(`📊 Retrieved ${trades.length} trades from Redis database`);
      
      // Ensure proper sorting (newest first)
      return trades.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error('❌ Error getting trades from Redis database:', error);
      return [];
    }
  }

  // Add new trades to database and maintain 150 trade limit
  static async addTrades(newTrades) {
    if (!REDIS_AVAILABLE) {
      console.log('⚠️ Redis not available, returning new trades without saving');
      return newTrades.sort((a, b) => b.timestamp - a.timestamp).slice(0, MAX_TRADES);
    }
    
    try {
      console.log(`💾 Adding ${newTrades.length} new trades to Redis database...`);
      
      if (!redisClient.isOpen) {
        await redisClient.connect();
      }
      
      // Get existing trades
      const existingTrades = await this.getTrades();
      
      // Combine new and existing trades
      const allTrades = [...newTrades, ...existingTrades];
      
      // Remove duplicates based on trade ID
      const uniqueTrades = allTrades.filter((trade, index, self) => 
        index === self.findIndex(t => t.id === trade.id)
      );
      
      // Sort by timestamp (newest first) and keep only 150 most recent
      const sortedTrades = uniqueTrades
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, MAX_TRADES);
      
      // Save to Redis database
      await redisClient.set(TRADES_KEY, JSON.stringify(sortedTrades));
      
      console.log(`✅ Saved ${sortedTrades.length} trades to Redis database (removed ${uniqueTrades.length - sortedTrades.length} older trades)`);
      
      return sortedTrades;
    } catch (error) {
      console.error('❌ Error adding trades to Redis database:', error);
      return newTrades;
    }
  }

  // Get tokens from database
  static async getTokens() {
    if (!REDIS_AVAILABLE) {
      console.log('⚠️ Redis not available, returning empty tokens array');
      return [];
    }
    
    try {
      if (!redisClient.isOpen) {
        await redisClient.connect();
      }
      
      const tokensData = await redisClient.get(TOKENS_KEY);
      const tokens = tokensData ? JSON.parse(tokensData) : [];
      console.log(`🪙 Retrieved ${tokens.length} tokens from Redis database`);
      return tokens;
    } catch (error) {
      console.error('❌ Error getting tokens from Redis database:', error);
      return [];
    }
  }

  // Update tokens in database
  static async updateTokens(tokens) {
    if (!REDIS_AVAILABLE) {
      console.log('⚠️ Redis not available, returning tokens without saving');
      return tokens;
    }
    
    try {
      if (!redisClient.isOpen) {
        await redisClient.connect();
      }
      
      await redisClient.set(TOKENS_KEY, JSON.stringify(tokens));
      console.log(`✅ Updated ${tokens.length} tokens in Redis database`);
      return tokens;
    } catch (error) {
      console.error('❌ Error updating tokens in Redis database:', error);
      return tokens;
    }
  }

  // Get stats from database
  static async getStats() {
    if (!REDIS_AVAILABLE) {
      console.log('⚠️ Redis not available, returning empty stats object');
      return {};
    }
    
    try {
      if (!redisClient.isOpen) {
        await redisClient.connect();
      }
      
      const statsData = await redisClient.get(STATS_KEY);
      const stats = statsData ? JSON.parse(statsData) : {};
      console.log('📈 Retrieved stats from Redis database');
      return stats;
    } catch (error) {
      console.error('❌ Error getting stats from Redis database:', error);
      return {};
    }
  }

  // Update stats in database
  static async updateStats(stats) {
    if (!REDIS_AVAILABLE) {
      console.log('⚠️ Redis not available, returning stats without saving');
      return stats;
    }
    
    try {
      if (!redisClient.isOpen) {
        await redisClient.connect();
      }
      
      await redisClient.set(STATS_KEY, JSON.stringify(stats));
      console.log('✅ Updated stats in Redis database');
      return stats;
    } catch (error) {
      console.error('❌ Error updating stats in Redis database:', error);
      return stats;
    }
  }

  // Get all data (trades, tokens, stats) at once
  static async getAllData() {
    try {
      const [trades, tokens, stats] = await Promise.all([
        this.getTrades(),
        this.getTokens(),
        this.getStats()
      ]);

      return {
        trades,
        tokens,
        stats,
        timestamp: new Date().toISOString(),
        tradesCount: trades.length,
        tokensCount: tokens.length
      };
    } catch (error) {
      console.error('❌ Error getting all data from database:', error);
      return {
        trades: [],
        tokens: [],
        stats: {},
        timestamp: new Date().toISOString(),
        tradesCount: 0,
        tokensCount: 0
      };
    }
  }

  // Clear old trades (keep only recent ones)
  static async cleanupOldTrades() {
    try {
      const trades = await this.getTrades();
      const recentTrades = trades.slice(0, MAX_TRADES);
      
      if (trades.length > MAX_TRADES) {
        await kv.set(TRADES_KEY, recentTrades);
        console.log(`🧹 Cleaned up ${trades.length - MAX_TRADES} old trades`);
      }
      
      return recentTrades;
    } catch (error) {
      console.error('❌ Error cleaning up old trades:', error);
      return [];
    }
  }

  // Initialize database with sample data if empty
  static async initializeDatabase() {
    if (!REDIS_AVAILABLE) {
      console.log('⚠️ Redis not available, skipping database initialization');
      return;
    }
    
    try {
      if (!redisClient.isOpen) {
        await redisClient.connect();
      }
      
      const existingTradesData = await redisClient.get(TRADES_KEY);
      const existingTrades = existingTradesData ? JSON.parse(existingTradesData) : [];
      
      if (!existingTrades || existingTrades.length === 0) {
        console.log('🔄 Redis database empty, initializing with sample data...');
        
        // Create initial sample trades
        const initialTrades = Array.from({ length: 10 }, (_, i) => {
          const secondsAgo = (i + 1) * 30; // 30s, 60s, 90s apart
          const timestamp = Date.now() - (secondsAgo * 1000);
          
          return {
            id: `init_${timestamp}_${i}`,
            timeAgo: `${secondsAgo}s ago`,
            type: Math.random() > 0.5 ? 'Buy' : 'Sell',
            pair: 'ADA/SNEK',
            inAmount: `${(Math.random() * 1000 + 100).toFixed(2)} ADA`,
            outAmount: `${(Math.random() * 10000 + 1000).toFixed(2)} SNEK`,
            price: `${(Math.random() * 0.01).toFixed(6)} ADA`,
            status: 'Success',
            dex: ['Minswap', 'SundaeSwap', 'WingRiders', 'Splash'][Math.floor(Math.random() * 4)],
            maker: `addr..${Math.random().toString(36).substr(2, 4)}`,
            timestamp: timestamp
          };
        });
        
        await this.addTrades(initialTrades);
        console.log('✅ Redis database initialized with sample trades');
      }
    } catch (error) {
      console.error('❌ Error initializing Redis database:', error);
    }
  }
}

export default DexyDatabase;