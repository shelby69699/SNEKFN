// Vercel serverless function for health check
export default async function handler(req, res) {
  try {
    console.log('🔥 Vercel health check...');
    
    const status = {
      status: 'healthy',
      service: 'DEXY Vercel API',
      timestamp: new Date().toISOString(),
      version: '2.0.0',
      environment: 'production',
      scraper: 'active',
      message: 'All systems operational'
    };
    
    res.status(200).json(status);
    
  } catch (error) {
    console.error('❌ Health check failed:', error);
    res.status(500).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}