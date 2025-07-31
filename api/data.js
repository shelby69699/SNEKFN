// Vercel serverless function to proxy to local backend with REAL DexHunter data
export default async function handler(req, res) {
  try {
    console.log('🔥 Proxying to local backend for REAL DexHunter data...');
    
    // Try to fetch REAL data from deployed backend
    const BACKEND_URL = process.env.BACKEND_URL || 'https://snekfn-backend-production.up.railway.app/api/data';
    console.log(`🔥 Fetching from: ${BACKEND_URL}`);
    
    const response = await fetch(BACKEND_URL, {
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