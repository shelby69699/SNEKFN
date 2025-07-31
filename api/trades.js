// Vercel serverless function for trades data
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    // Read the static trades data
    const tradesPath = path.join(process.cwd(), 'src/data/dexhunter-trades.js');
    const tradesContent = fs.readFileSync(tradesPath, 'utf8');
    
    // Extract DEXY_TRADES from the file
    const tradesMatch = tradesContent.match(/export const DEXY_TRADES = (\[[\s\S]*?\]);/);
    
    if (tradesMatch) {
      const tradesData = eval(tradesMatch[1]);
      res.status(200).json({
        trades: tradesData,
        count: tradesData.length,
        lastUpdated: new Date().toISOString()
      });
    } else {
      res.status(500).json({ error: 'Could not parse trades data' });
    }
  } catch (error) {
    console.error('Error reading trades:', error);
    res.status(500).json({ error: 'Failed to load trades data' });
  }
}