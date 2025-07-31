// Vercel serverless function for tokens data from DATABASE
import { DexyDatabase } from '../lib/database.js';

export default async function handler(req, res) {
  try {
    console.log('🪙 Fetching tokens from database...');
    
    // Get tokens from database
    const tokens = await DexyDatabase.getTokens();
    
    // If database has no tokens (KV not available), use static fallback immediately
    if (tokens.length === 0) {
      console.log('⚠️ Database returned empty tokens, using static fallback...');
      
      try {
        const { DEXY_TOKENS } = await import('../src/data/dexhunter-data.js');
        
        console.log(`✅ Serving ${DEXY_TOKENS.length} tokens from static fallback`);
        
        return res.status(200).json({
          success: true,
          tokens: DEXY_TOKENS || [],
          count: DEXY_TOKENS?.length || 0,
          lastUpdated: new Date().toISOString(),
          source: 'static-fallback-due-to-empty-db'
        });
      } catch (staticError) {
        return res.status(500).json({ 
          error: 'Failed to load tokens from database and static fallback',
          details: staticError.message
        });
      }
    }
    
    console.log(`✅ Serving ${tokens.length} tokens from database`);
    
    res.status(200).json({
      success: true,
      tokens: tokens,
      count: tokens.length,
      lastUpdated: new Date().toISOString(),
      source: 'database'
    });
  } catch (error) {
    console.error('❌ Error reading tokens from database:', error);
    
    // Fallback to static data
    try {
      const { DEXY_TOKENS } = await import('../src/data/dexhunter-data.js');
      
      res.status(200).json({
        success: true,
        tokens: DEXY_TOKENS || [],
        count: DEXY_TOKENS?.length || 0,
        lastUpdated: new Date().toISOString(),
        source: 'static-fallback',
        error: error.message
      });
    } catch (fallbackError) {
      res.status(500).json({ 
        error: 'Failed to load tokens from database and fallback',
        details: error.message,
        fallbackError: fallbackError.message
      });
    }
  }
}