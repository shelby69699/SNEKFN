// Vercel serverless function for health check - proxy to local backend
export default async function handler(req, res) {
  try {
    // Try to fetch from deployed backend
    const BACKEND_URL = process.env.BACKEND_URL || 'https://snekfn-backend-production.up.railway.app/api/health';
    console.log(`🔥 Fetching from: ${BACKEND_URL}`);
    
    const response = await fetch(BACKEND_URL, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });

    if (response.ok) {
      const healthData = await response.json();
      res.status(200).json({
        ...healthData,
        proxy: 'vercel',
        localBackend: 'connected'
      });
    } else {
      throw new Error(`Backend returned ${response.status}`);
    }
  } catch (error) {
    // Fallback if local backend not available
    res.status(200).json({ 
      status: 'ok', 
      message: 'DEXY Vercel API running (local backend unavailable)',
      timestamp: new Date().toISOString(),
      localBackend: 'disconnected',
      error: error.message
    });
  }
}