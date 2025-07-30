// Automated DexHunter scraper - runs every 5 minutes
const { scrapeDexHunterTrades } = require('./scrape-dexhunter.cjs');

console.log('🚀 Starting automated DexHunter scraper...');
console.log('⏰ Will scrape every 5 minutes for fresh data');

// Function to run scraper
async function runScraper() {
  try {
    console.log(`\n📡 ${new Date().toISOString()} - Starting scrape...`);
    await scrapeDexHunterTrades();
    console.log('✅ Scrape completed successfully!');
  } catch (error) {
    console.error('❌ Scrape failed:', error.message);
  }
}

// Run immediately
runScraper();

// Then run every 5 minutes
setInterval(runScraper, 5 * 60 * 1000);

// Keep the process alive
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping automated scraper...');
  process.exit(0);
});

console.log('🎯 Automated scraper is running! Press Ctrl+C to stop.');