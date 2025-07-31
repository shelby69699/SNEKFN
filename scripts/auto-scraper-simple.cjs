// Simple auto-scraper that just updates data every 30 seconds
const { execSync } = require('child_process');

console.log('🚀 Starting SIMPLE continuous DexHunter scraper...');
console.log('⏰ Will scrape FRESH trades every 30 seconds');
console.log('💾 Data will be updated automatically');
console.log('🔥 Press Ctrl+C to stop');

let scrapeCount = 0;

function runScrape() {
  scrapeCount++;
  const timestamp = new Date().toISOString();
  
  console.log(`📡 ${timestamp} - SCRAPE #${scrapeCount} STARTING...`);
  
  try {
    // Run the scraper
    execSync('node scripts/scrape-both.cjs', { stdio: 'pipe' });
    console.log(`✅ SCRAPE #${scrapeCount} SUCCESS!`);
    console.log(`📊 Fresh trades updated locally`);
  } catch (error) {
    console.error(`❌ SCRAPE #${scrapeCount} FAILED:`, error.message);
  }
  
  console.log(`⏰ Next scrape in 30 seconds...`);
}

// Start the continuous scraping cycle
console.log('✅ Starting continuous scraper...');

// Run immediately
runScrape();

// Then run every 30 seconds
setInterval(runScrape, 30000);