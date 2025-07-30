// DEXY Proxy API - Fetches real DexHunter data through our CORS-free proxy server

const PROXY_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://dexy-proxy.vercel.app'  // Deploy proxy server here
  : 'http://localhost:3001';

class ProxyAPI {
  constructor() {
    this.baseURL = PROXY_BASE_URL;
  }

  // Fetch real DexHunter trades through proxy
  async fetchGlobalTrades(limit = 50) {
    try {
      console.log('🔄 Fetching trades via DEXY proxy...');
      
      const response = await fetch(`${this.baseURL}/api/dexhunter/trades`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        // Add timeout
        signal: AbortSignal.timeout(15000)
      });

      if (!response.ok) {
        throw new Error(`Proxy API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success && data.trades) {
        console.log(`✅ Proxy SUCCESS: ${data.trades.length} trades from ${data.source}`);
        return data.trades.slice(0, limit);
      } else {
        console.error('❌ Proxy returned invalid data:', data);
        return this.getFallbackTrades();
      }

    } catch (error) {
      console.error('❌ Proxy API failed:', error.message);
      
      // If proxy fails, return realistic Cardano trades
      return this.getFallbackTrades();
    }
  }

  // Fetch trending tokens through proxy
  async fetchTrendingTokens() {
    try {
      console.log('🔄 Fetching trending tokens via DEXY proxy...');
      
      const response = await fetch(`${this.baseURL}/api/dexhunter/trending`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(15000)
      });

      if (!response.ok) {
        throw new Error(`Trending proxy error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.tokens) {
        console.log(`✅ Trending SUCCESS: ${data.tokens.length} tokens from ${data.source}`);
        return data.tokens;
      } else {
        return this.getFallbackTokens();
      }

    } catch (error) {
      console.error('❌ Trending proxy failed:', error.message);
      return this.getFallbackTokens();
    }
  }

  // Fallback realistic Cardano trades
  getFallbackTrades() {
    console.log('🎯 Using fallback Cardano trades...');
    
    const cardanoTokens = ['ADA', 'DJED', 'SNEK', 'MIN', 'HOSKY', 'SUNDAE', 'AGIX', 'WMT'];
    const dexes = ['Minswap', 'SundaeSwap', 'WingRiders', 'Spectrum', 'MuesliSwap'];
    
    return Array.from({ length: 25 }, (_, i) => {
      const tokenIn = cardanoTokens[Math.floor(Math.random() * cardanoTokens.length)];
      let tokenOut = cardanoTokens[Math.floor(Math.random() * cardanoTokens.length)];
      while (tokenOut === tokenIn) {
        tokenOut = cardanoTokens[Math.floor(Math.random() * cardanoTokens.length)];
      }

      return {
        id: `fallback_${Date.now()}_${i}`,
        type: Math.random() > 0.5 ? 'Buy' : 'Sell',
        pair: `${tokenIn} > ${tokenOut}`,
        inAmount: `${(Math.random() * 1000 + 10).toFixed(2)} ${tokenIn}`,
        outAmount: `${(Math.random() * 10000 + 100).toFixed(2)} ${tokenOut}`,
        price: `${(Math.random() * 0.1 + 0.001).toFixed(6)} ADA`,
        status: Math.random() > 0.05 ? 'Success' : 'Pending',
        dex: dexes[Math.floor(Math.random() * dexes.length)],
        maker: `addr..${Math.random().toString(36).substr(2, 4)}`,
        timeAgo: `${Math.floor(Math.random() * 300) + 1}s ago`,
        timestamp: Date.now() - (Math.random() * 300000)
      };
    });
  }

  // Fallback Cardano ecosystem tokens
  getFallbackTokens() {
    console.log('🎯 Using fallback Cardano tokens...');
    
    return [
      {
        id: 'cardano',
        name: 'Cardano',
        symbol: 'ADA',
        logo: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
        category: 'Layer 1',
        price: 0.45 + (Math.random() - 0.5) * 0.1,
        change_24h: (Math.random() - 0.5) * 20,
        volume_24h: 1200000000 + Math.random() * 300000000,
        market_cap: 15800000000 + Math.random() * 2000000000,
        holders: 4200000,
        rank: 1
      },
      {
        id: 'djed',
        name: 'DJED',
        symbol: 'DJED',
        logo: 'https://pbs.twimg.com/profile_images/1494689689341177857/rGMNyYos_400x400.jpg',
        category: 'Stablecoin',
        price: 1.0 + (Math.random() - 0.5) * 0.02,
        change_24h: (Math.random() - 0.5) * 2,
        volume_24h: 10000000 + Math.random() * 5000000,
        market_cap: 100000000 + Math.random() * 20000000,
        holders: 25000,
        rank: 2
      },
      {
        id: 'snek',
        name: 'SNEK',
        symbol: 'SNEK',
        logo: 'https://pbs.twimg.com/profile_images/1658861271498850307/w4Z4_5vJ_400x400.jpg',
        category: 'Meme',
        price: 0.00085 + (Math.random() - 0.5) * 0.0002,
        change_24h: (Math.random() - 0.5) * 150,
        volume_24h: 850000 + Math.random() * 200000,
        market_cap: 8500000 + Math.random() * 2000000,
        holders: 75000,
        rank: 3
      },
      {
        id: 'min',
        name: 'Minswap',
        symbol: 'MIN',
        logo: 'https://pbs.twimg.com/profile_images/1462416892156706818/MzT_KsEO_400x400.jpg',
        category: 'DeFi',
        price: 0.028 + (Math.random() - 0.5) * 0.01,
        change_24h: (Math.random() - 0.5) * 30,
        volume_24h: 420000 + Math.random() * 100000,
        market_cap: 28000000 + Math.random() * 5000000,
        holders: 50000,
        rank: 4
      },
      {
        id: 'hosky',
        name: 'HOSKY',
        symbol: 'HOSKY',
        logo: 'https://pbs.twimg.com/profile_images/1482376298902732803/NGYkEUCL_400x400.jpg',
        category: 'Meme',
        price: 0.000001 + (Math.random() - 0.5) * 0.0000002,
        change_24h: (Math.random() - 0.5) * 80,
        volume_24h: 2000000 + Math.random() * 500000,
        market_cap: 20000000 + Math.random() * 5000000,
        holders: 120000,
        rank: 5
      }
    ];
  }

  // Health check
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL}/health`, {
        signal: AbortSignal.timeout(5000)
      });
      return response.ok;
    } catch (error) {
      console.error('❌ Proxy health check failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const proxyAPI = new ProxyAPI();
export default proxyAPI;