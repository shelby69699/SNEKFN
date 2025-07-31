// Vercel serverless function for tokens data
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    // Read the static tokens data
    const tokensPath = path.join(process.cwd(), 'src/data/dexhunter-data.js');
    const tokensContent = fs.readFileSync(tokensPath, 'utf8');
    
    // Extract DEXY_TOKENS from the file
    const tokensMatch = tokensContent.match(/export const DEXY_TOKENS = (\[[\s\S]*?\]);/);
    
    if (tokensMatch) {
      const tokensData = eval(tokensMatch[1]);
      res.status(200).json({
        tokens: tokensData,
        count: tokensData.length,
        lastUpdated: new Date().toISOString()
      });
    } else {
      res.status(500).json({ error: 'Could not parse tokens data' });
    }
  } catch (error) {
    console.error('Error reading tokens:', error);
    res.status(500).json({ error: 'Failed to load tokens data' });
  }
}