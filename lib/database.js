// Database utilities for Vercel KV (Redis) - Persistent trade storage
import { kv } from '@vercel/kv';

const TRADES_KEY = 'dexy:trades';
const TOKENS_KEY = 'dexy:tokens';
const STATS_KEY = 'dexy:stats';
const MAX_TRADES = 150; // Keep only 150 most recent trades

export class DexyDatabase {
  // Get all trades from database (sorted by timestamp, newest first)
  static async getTrades() {
    try {
      const trades = await kv.get(TRADES_KEY) || [];
      console.log(`📊 Retrieved ${trades.length} trades from database`);
      
      // Ensure proper sorting (newest first)
      return trades.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error('❌ Error getting trades from database:', error);
      return [];
    }
  }

  // Add new trades to database and maintain 150 trade limit
  static async addTrades(newTrades) {
    try {
      console.log(`💾 Adding ${newTrades.length} new trades to database...`);
      
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
      
      // Save to database
      await kv.set(TRADES_KEY, sortedTrades);
      
      console.log(`✅ Saved ${sortedTrades.length} trades to database (removed ${uniqueTrades.length - sortedTrades.length} older trades)`);
      
      return sortedTrades;
    } catch (error) {
      console.error('❌ Error adding trades to database:', error);
      return [];
    }
  }

  // Get tokens from database
  static async getTokens() {
    try {
      const tokens = await kv.get(TOKENS_KEY) || [];
      console.log(`🪙 Retrieved ${tokens.length} tokens from database`);
      return tokens;
    } catch (error) {
      console.error('❌ Error getting tokens from database:', error);
      return [];
    }
  }

  // Update tokens in database
  static async updateTokens(tokens) {
    try {
      await kv.set(TOKENS_KEY, tokens);
      console.log(`✅ Updated ${tokens.length} tokens in database`);
      return tokens;
    } catch (error) {
      console.error('❌ Error updating tokens in database:', error);
      return [];
    }
  }

  // Get stats from database
  static async getStats() {
    try {
      const stats = await kv.get(STATS_KEY) || {};
      console.log('📈 Retrieved stats from database');
      return stats;
    } catch (error) {
      console.error('❌ Error getting stats from database:', error);
      return {};
    }
  }

  // Update stats in database
  static async updateStats(stats) {
    try {
      await kv.set(STATS_KEY, stats);
      console.log('✅ Updated stats in database');
      return stats;
    } catch (error) {
      console.error('❌ Error updating stats in database:', error);
      return {};
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
    try {
      const existingTrades = await kv.get(TRADES_KEY);
      
      if (!existingTrades || existingTrades.length === 0) {
        console.log('🔄 Database empty, initializing with sample data...');
        
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
        console.log('✅ Database initialized with sample trades');
      }
    } catch (error) {
      console.error('❌ Error initializing database:', error);
    }
  }
}

export default DexyDatabase;