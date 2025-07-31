// Debug endpoint to check environment variables
export default function handler(req, res) {
  const envCheck = {
    timestamp: new Date().toISOString(),
    vercel: !!process.env.VERCEL,
    kvRestApiUrl: !!process.env.KV_REST_API_URL,
    kvRestApiToken: !!process.env.KV_REST_API_TOKEN,
    kvUrlPreview: process.env.KV_REST_API_URL ? 
      process.env.KV_REST_API_URL.substring(0, 30) + '...' : 
      'NOT SET',
    kvTokenPreview: process.env.KV_REST_API_TOKEN ? 
      'TOKEN_EXISTS_' + process.env.KV_REST_API_TOKEN.substring(0, 8) + '...' : 
      'NOT SET',
    allEnvKeys: Object.keys(process.env).filter(key => 
      key.includes('KV') || key.includes('REDIS') || key.includes('DATABASE')
    )
  };

  console.log('🔍 Environment Variables Debug:', envCheck);

  res.status(200).json({
    success: true,
    message: 'Environment variables check',
    data: envCheck
  });
}