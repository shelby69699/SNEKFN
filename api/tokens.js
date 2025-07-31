// Vercel serverless function to proxy tokens from local backend with REAL DexHunter data
export default async function handler(req, res) {
  try {
    console.log('🔥 Proxying tokens from local backend...');
    
    // Try to fetch REAL tokens from deployed backend
    const BACKEND_URL = process.env.BACKEND_URL || 'https://snekfn-backend-production.up.railway.app/api/tokens';
    console.log(`🔥 Fetching from: ${BACKEND_URL}`);
    
    const response = await fetch(BACKEND_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'DEXY-Vercel-Proxy/1.0'
      },
      signal: AbortSignal.timeout(10000)
    });

    if (response.ok) {
      const realTokens = await response.json();
      console.log(`🔥 SUCCESS! Serving ${realTokens.length || 0} REAL tokens from local backend`);
      
      res.status(200).json(realTokens);
      return;
    }
    
    throw new Error(`Local backend returned status: ${response.status}`);
  } catch (error) {
    console.error('❌ Local backend tokens not available:', error.message);
    
    // NO FALLBACK DATA - REAL DATA ONLY!
    console.log('❌ NO BACKEND AVAILABLE - RETURNING EMPTY TOKENS (NO FAKE SHIT)');
    res.status(503).json({
      error: 'Backend not available',
      data: [],
      count: 0,
      source: 'none',
      message: 'Real backend required - no fake data served'
    });
  }
}