// Vercel serverless function to serve all data from DATABASE (150 trades)
import { DexyDatabase } from '../lib/database.js';

export default async function handler(req, res) {
  try {
    console.log('📊 Fetching all data from database (150 trades)...');
    
    // Get ALL data from database (150 trades + tokens + stats)
    const allData = await DexyDatabase.getAllData();
    
    console.log(`✅ Serving ${allData.tradesCount} trades and ${allData.tokensCount} tokens from database`);

    res.status(200).json({
      success: true,
      ...allData,
      source: 'database'
    });
  } catch (error) {
    console.error('❌ Error serving data from database:', error);
    
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