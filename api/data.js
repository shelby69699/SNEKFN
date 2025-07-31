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
    
    // NO FALLBACK DATA - REAL DATA ONLY!
    console.log('❌ NO BACKEND AVAILABLE - RETURNING EMPTY DATA (NO FAKE SHIT)');
    res.status(503).json({
      error: 'Backend not available',
      trades: [],
      tokens: [],
      stats: { totalTrades: 0, totalVolume: '0', activeUsers: 0, totalLiquidity: '0' },
      lastUpdated: null,
      source: 'none',
      message: 'Real backend required - no fake data served'
    });
  }
}