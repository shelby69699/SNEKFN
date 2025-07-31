// Vercel serverless function to trigger live scraping
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🚀 Starting live scraper...');
    
    // Run the scraper
    const scriptPath = path.join(process.cwd(), 'scripts/scrape-both.cjs');
    
    return new Promise((resolve, reject) => {
      const scraper = spawn('node', [scriptPath], {
        cwd: process.cwd(),
        stdio: 'pipe'
      });

      let output = '';
      let errorOutput = '';

      scraper.stdout.on('data', (data) => {
        output += data.toString();
        console.log('Scraper output:', data.toString());
      });

      scraper.stderr.on('data', (data) => {
        errorOutput += data.toString();
        console.error('Scraper error:', data.toString());
      });

      scraper.on('close', (code) => {
        if (code === 0) {
          console.log('✅ Scraper completed successfully');
          
          // Read the updated data to confirm it worked
          try {
            const tradesPath = path.join(process.cwd(), 'src/data/dexhunter-trades.js');
            const tokensPath = path.join(process.cwd(), 'src/data/dexhunter-data.js');
            
            const tradesContent = fs.readFileSync(tradesPath, 'utf8');
            const tokensContent = fs.readFileSync(tokensPath, 'utf8');
            
            const tradesMatch = tradesContent.match(/export const DEXY_TRADES = (\[[\s\S]*?\]);/);
            const tokensMatch = tokensContent.match(/export const DEXY_TOKENS = (\[[\s\S]*?\]);/);
            
            const tradesCount = tradesMatch ? eval(tradesMatch[1]).length : 0;
            const tokensCount = tokensMatch ? eval(tokensMatch[1]).length : 0;
            
            res.status(200).json({
              success: true,
              message: 'Scraper completed successfully',
              data: {
                tradesCount,
                tokensCount,
                timestamp: new Date().toISOString()
              },
              output,
              code
            });
            resolve();
          } catch (readError) {
            console.error('Error reading scraped data:', readError);
            res.status(200).json({
              success: true,
              message: 'Scraper completed but could not read data',
              output,
              code,
              readError: readError.message
            });
            resolve();
          }
        } else {
          console.error('❌ Scraper failed with code:', code);
          res.status(500).json({
            success: false,
            message: 'Scraper failed',
            output,
            errorOutput,
            code
          });
          resolve();
        }
      });

      scraper.on('error', (error) => {
        console.error('❌ Failed to start scraper:', error);
        res.status(500).json({
          success: false,
          message: 'Failed to start scraper',
          error: error.message
        });
        resolve();
      });

      // Set timeout for scraper (30 seconds max)
      setTimeout(() => {
        scraper.kill();
        res.status(500).json({
          success: false,
          message: 'Scraper timeout after 30 seconds',
          output,
          errorOutput
        });
        resolve();
      }, 30000);
    });

  } catch (error) {
    console.error('❌ Scraper error:', error);
    res.status(500).json({
      success: false,
      message: 'Scraper failed',
      error: error.message
    });
  }
}