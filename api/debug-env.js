// Debug endpoint to check environment variables
export default function handler(req, res) {
  const envCheck = {
    timestamp: new Date().toISOString(),
    vercel: !!process.env.VERCEL,
    redisUrl: !!process.env.REDIS_URL,
    redisUrlPreview: process.env.REDIS_URL ? 
      process.env.REDIS_URL.substring(0, 30) + '...' : 
      'NOT SET',
    allEnvKeys: Object.keys(process.env).filter(key => 
      key.includes('KV') || key.includes('REDIS') || key.includes('DATABASE')
    )
  };

  console.log('🔍 Environment Variables Debug:', envCheck);

  res.status(200).json({
    success: true,
    message: 'Redis environment variables check',
    data: envCheck
  });
}