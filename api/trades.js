// Vercel serverless function for trades data from DATABASE
import { DexyDatabase } from '../lib/database.js';

export default async function handler(req, res) {
  try {
    console.log('📊 Fetching trades from database...');
    
    // Get trades from database (150 most recent)
    const trades = await DexyDatabase.getTrades();
    
    console.log(`✅ Serving ${trades.length} trades from database`);
    
    res.status(200).json({
      success: true,
      trades: trades,
      count: trades.length,
      lastUpdated: new Date().toISOString(),
      source: 'database'
    });
  } catch (error) {
    console.error('❌ Error reading trades from database:', error);
    
    // Fallback to static data
    try {
      const { DEXY_TRADES } = await import('../src/data/dexhunter-trades.js');
      
      res.status(200).json({
        success: true,
        trades: DEXY_TRADES || [],
        count: DEXY_TRADES?.length || 0,
        lastUpdated: new Date().toISOString(),
        source: 'static-fallback',
        error: error.message
      });
    } catch (fallbackError) {
      res.status(500).json({ 
        error: 'Failed to load trades from database and fallback',
        details: error.message,
        fallbackError: fallbackError.message
      });
    }
  }
}