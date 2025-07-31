// Vercel serverless function for health check
export default function handler(req, res) {
  res.status(200).json({ 
    status: 'ok', 
    message: 'DEXY API is running',
    timestamp: new Date().toISOString()
  });
}