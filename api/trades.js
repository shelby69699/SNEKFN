// Vercel serverless function to proxy trades from local backend with REAL DexHunter data
export default async function handler(req, res) {
  try {
    console.log('🔥 Proxying trades from local backend...');
    
    // Try to fetch REAL trades from local backend
    const response = await fetch('http://localhost:9999/api/trades', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'DEXY-Vercel-Proxy/1.0'
      },
      signal: AbortSignal.timeout(10000)
    });

    if (response.ok) {
      const realTrades = await response.json();
      console.log(`🔥 SUCCESS! Serving ${realTrades.length || 0} REAL trades from local backend`);
      
      res.status(200).json(realTrades);
      return;
    }
    
    throw new Error(`Local backend returned status: ${response.status}`);
  } catch (error) {
    console.error('❌ Local backend trades not available:', error.message);
    
    // NO FALLBACK DATA - REAL DATA ONLY!
    console.log('❌ NO BACKEND AVAILABLE - RETURNING EMPTY TRADES (NO FAKE SHIT)');
    res.status(503).json({
      error: 'Backend not available',
      data: [],
      count: 0,
      source: 'none',
      message: 'Real backend required - no fake data served'
    });
        
        return res.status(200).json({
          success: true,
          trades: DEXY_TRADES || [],
          count: DEXY_TRADES?.length || 0,
          lastUpdated: new Date().toISOString(),
          source: 'static-fallback-due-to-empty-db'
        });
      } catch (staticError) {
        return res.status(500).json({ 
          error: 'Failed to load trades from database and static fallback',
          details: staticError.message
        });
      }
    }
    
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