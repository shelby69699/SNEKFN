// Vercel serverless function for scraper status
export default function handler(req, res) {
  if (req.method === 'GET') {
    // In serverless environment, scraper runs on-demand
    res.status(200).json({
      running: false,
      type: 'serverless',
      message: 'Scraper runs on-demand via GitHub Actions or manual execution',
      lastUpdated: new Date().toISOString()
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}