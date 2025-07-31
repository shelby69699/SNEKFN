// Vercel serverless function for all data
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    // Read tokens data
    const tokensPath = path.join(process.cwd(), 'src/data/dexhunter-data.js');
    const tokensContent = fs.readFileSync(tokensPath, 'utf8');
    const tokensMatch = tokensContent.match(/export const DEXY_TOKENS = (\[[\s\S]*?\]);/);
    
    // Read trades data
    const tradesPath = path.join(process.cwd(), 'src/data/dexhunter-trades.js');
    const tradesContent = fs.readFileSync(tradesPath, 'utf8');
    const tradesMatch = tradesContent.match(/export const DEXY_TRADES = (\[[\s\S]*?\]);/);
    
    const tokensData = tokensMatch ? eval(tokensMatch[1]) : [];
    const tradesData = tradesMatch ? eval(tradesMatch[1]) : [];
    
    // Mock stats based on the data
    const stats = {
      totalVolume24h: "12.5M ADA",
      totalTrades24h: tradesData.length.toString(),
      avgTradeSize: "1,250 ADA",
      activeTokens: tokensData.length.toString()
    };
    
    res.status(200).json({
      tokens: tokensData,
      trades: tradesData,
      stats: stats,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).json({ error: 'Failed to load data' });
  }
}