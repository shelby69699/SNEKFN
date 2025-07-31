// Vercel serverless function with REAL DexHunter scraping
export default async function handler(req, res) {
  try {
    console.log('🔥 Running DexHunter scraper on Vercel...');
    
    // Use the scraper function directly in Vercel
    const scraperResponse = await fetch(`${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/api/scraper`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    
    if (scraperResponse.ok) {
      const data = await scraperResponse.json();
      console.log(`🔥 SUCCESS! Serving ${data.trades?.length || 0} REAL trades from Vercel scraper`);
      
      res.status(200).json(data);
      return;
    }
    
    throw new Error(`Scraper returned status: ${scraperResponse.status}`);
    
  } catch (error) {
    console.error('❌ Vercel scraper failed:', error.message);
    
    // NO FALLBACK DATA - REAL DATA ONLY!
    console.log('❌ SCRAPER FAILED - RETURNING EMPTY DATA (NO FAKE SHIT)');
    res.status(503).json({
      error: 'Scraper failed',
      trades: [],
      tokens: [],
      stats: { totalTrades: 0, totalVolume: '0', activeUsers: 0, totalLiquidity: '0' },
      lastUpdated: null,
      source: 'none',
      message: 'Real scraper required - no fake data served'
    });
  }
}