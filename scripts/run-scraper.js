// Script to run the DexHunter scraper and update data files
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Running DexHunter scraper...');

// Run the scraper
const scraperPath = join(__dirname, 'scrape-dexhunter.cjs');
const scraper = spawn('node', [scraperPath], {
  stdio: 'inherit',
  cwd: process.cwd()
});

scraper.on('close', (code) => {
  if (code === 0) {
    console.log('✅ DexHunter scraping completed successfully!');
  } else {
    console.log(`❌ DexHunter scraping failed with code ${code}`);
  }
});

scraper.on('error', (error) => {
  console.error('❌ Error running scraper:', error);
});