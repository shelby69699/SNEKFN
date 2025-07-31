// Vercel serverless function for trades - Uses main data endpoint
export default async function handler(req, res) {
  try {
    console.log('🔥 Fetching trades from Vercel data endpoint...');
    
    // Get data from our main scraper
    const dataResponse = await fetch(`${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/api/data`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    
    if (dataResponse.ok) {
      const data = await dataResponse.json();
      console.log(`🔥 SUCCESS! Serving ${data.trades?.length || 0} trades`);
      
      res.status(200).json({
        success: true,
        data: data.trades || [],
        count: data.trades?.length || 0,
        source: 'vercel-trades',
        lastUpdated: data.lastUpdated
      });
      return;
    }
    
    throw new Error(`Data endpoint returned status: ${dataResponse.status}`);
    
  } catch (error) {
    console.error('❌ Trades endpoint failed:', error.message);
    
    res.status(503).json({
      error: 'Trades service unavailable',
      data: [],
      count: 0,
      source: 'none',
      message: 'Real trades service required'
    });
  }
}