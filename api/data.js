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
    
    // Fallback to static data if database fails
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