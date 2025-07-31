// Vercel serverless function to initialize the database
import { DexyDatabase } from '../lib/database.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🚀 Initializing DEXY database...');
    
    // Initialize database with sample data if empty
    await DexyDatabase.initializeDatabase();
    
    // Get the current data to confirm initialization
    const allData = await DexyDatabase.getAllData();
    
    console.log(`✅ Database initialized: ${allData.tradesCount} trades, ${allData.tokensCount} tokens`);
    
    res.status(200).json({
      success: true,
      message: 'Database initialized successfully',
      data: allData,
      initialized: true
    });
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    res.status(500).json({
      error: 'Failed to initialize database',
      details: error.message
    });
  }
}