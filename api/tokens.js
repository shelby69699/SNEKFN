// Vercel serverless function for tokens - Uses main data endpoint
export default async function handler(req, res) {
  try {
    console.log('🔥 Fetching tokens from Vercel data endpoint...');
    
    // Get data from our main scraper
    const dataResponse = await fetch(`${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/api/data`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    
    if (dataResponse.ok) {
      const data = await dataResponse.json();
      console.log(`🔥 SUCCESS! Serving ${data.tokens?.length || 0} tokens`);
      
      res.status(200).json({
        success: true,
        data: data.tokens || [],
        count: data.tokens?.length || 0,
        source: 'vercel-tokens',
        lastUpdated: data.lastUpdated
      });
      return;
    }
    
    throw new Error(`Data endpoint returned status: ${dataResponse.status}`);
    
  } catch (error) {
    console.error('❌ Tokens endpoint failed:', error.message);
    
    res.status(503).json({
      error: 'Tokens service unavailable',
      data: [],
      count: 0,
      source: 'none',
      message: 'Real tokens service required'
    });
  }
}