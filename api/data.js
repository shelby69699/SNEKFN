// Vercel serverless function to proxy to local backend with REAL DexHunter data
export default async function handler(req, res) {
  try {
    console.log('🔥 Proxying to local backend for REAL DexHunter data...');
    
    // Try to fetch from local backend first (REAL data)
    const response = await fetch('http://localhost:9999/api/data', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'DEXY-Vercel-Proxy/1.0'
      },
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });

    if (response.ok) {
      const realData = await response.json();
      console.log(`🔥 SUCCESS! Serving ${realData.trades?.length || 0} REAL trades from local backend`);
      
      res.status(200).json({
        ...realData,
        source: 'real-local-backend',
        proxy: 'vercel'
      });
      return;
    }
    
    throw new Error(`Local backend returned status: ${response.status}`);
  } catch (error) {
    console.error('❌ Local backend not available:', error.message);
    
    // Return same live demo trades as backend fallback
    console.log('🔥 Using live demo trades (same as backend fallback)');
    const liveTimestamp = Date.now();
    
    const liveDemoTrades = [
      {
        id: `live_${liveTimestamp}_1`,
        time: '25s ago',
        type: 'Buy',
        pair: 'ADA > SNEK',
        token1: { symbol: 'ADA', amount: '100', icon: '🔷' },
        token2: { symbol: 'SNEK', amount: '112,360', icon: '🐍' },
        inAmount: '100 ADA',
        outAmount: '112,360 SNEK',
        price: '0.00089 ADA',
        status: 'Success',
        dex: 'DexHunter',
        maker: 'addr...5x2k',
        timestamp: liveTimestamp - 25000,
        direction: 'up',
        source: 'LIVE_DEMO'
      },
      {
        id: `live_${liveTimestamp}_2`,
        time: '1m ago',
        type: 'Sell',
        pair: 'SUPERIOR > ADA',
        token1: { symbol: 'SUPERIOR', amount: '500K', icon: '👑' },
        token2: { symbol: 'ADA', amount: '198', icon: '🔷' },
        inAmount: '500K SUPERIOR',
        outAmount: '198 ADA',
        price: '0.000396 ADA',
        status: 'Success',
        dex: 'DexHunter',
        maker: 'addr...7h9m',
        timestamp: liveTimestamp - 60000,
        direction: 'down',
        source: 'LIVE_DEMO'
      },
      {
        id: `live_${liveTimestamp}_3`,
        time: '2m ago',
        type: 'Buy',
        pair: 'ADA > MIN',
        token1: { symbol: 'ADA', amount: '2.9K', icon: '🔷' },
        token2: { symbol: 'MIN', amount: '95.7K', icon: '⚡' },
        inAmount: '2.9K ADA',
        outAmount: '95.7K MIN',
        price: '0.03029 ADA',
        status: 'Success',
        dex: 'DexHunter',
        maker: 'addr...k3n8',
        timestamp: liveTimestamp - 120000,
        direction: 'up',
        source: 'LIVE_DEMO'
      }
    ];

    const liveDemoTokens = [
      { symbol: 'ADA', name: 'Cardano', icon: '🔷', price: 0.45, change24h: -1.92, volume24h: 973706 },
      { symbol: 'SNEK', name: 'Snek', icon: '🐍', price: 0.00089, change24h: 12.5, volume24h: 245832 },
      { symbol: 'SUPERIOR', name: 'SUPERIOR', icon: '👑', price: 0.000396, change24h: 5.73, volume24h: 253092 },
      { symbol: 'MIN', name: 'Minswap', icon: '⚡', price: 0.03029, change24h: 8.21, volume24h: 445921 }
    ];

    const liveDemoStats = {
      totalTrades: liveDemoTrades.length,
      totalVolume: '9,659,872',
      activeUsers: 323,
      totalLiquidity: '293,274'
    };

    res.status(200).json({
      trades: liveDemoTrades,
      tokens: liveDemoTokens,
      stats: liveDemoStats,
      lastUpdated: new Date().toISOString(),
      source: 'vercel-live-demo',
      note: 'Live demo data when local backend unavailable'
    });
    return;
    
    // Static fallback only if live demo fails
    try {
      const { DEXY_TOKENS } = await import('../src/data/dexhunter-data.js');
      const { DEXY_TRADES } = await import('../src/data/dexhunter-trades.js');
      
      const fallbackStats = {
        totalVolume24h: "15.2M ADA",
        totalTrades24h: (2800 + DEXY_TRADES.length + Math.floor(Math.random() * 200)).toString(),
        avgTradeSize: "1,250 ADA",
        activeTokens: DEXY_TOKENS.length.toString()
      };

      res.status(200).json({
        success: true,
        tokens: DEXY_TOKENS || [],
        trades: DEXY_TRADES || [],
        stats: fallbackStats,
        timestamp: new Date().toISOString(),
        tokensCount: DEXY_TOKENS?.length || 0,
        tradesCount: DEXY_TRADES?.length || 0,
        source: 'static-fallback',
        error: error.message
      });
    } catch (fallbackError) {
      console.error('❌ Fallback data also failed:', fallbackError);
      res.status(500).json({
        error: 'Failed to load data from database and fallback',
        details: error.message,
        fallbackError: fallbackError.message
      });
    }
  }
}