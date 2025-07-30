// Continuous DexHunter global trades scraper - EVERY 30 SECONDS
const { scrapeEverything } = require('./scrape-both.cjs');

console.log('🚀 Starting CONTINUOUS DexHunter global trades scraper...');
console.log('⏰ Will scrape FRESH trades every 30 seconds');
console.log('🔥 Press Ctrl+C to stop');

let scrapeCount = 0;

// Function to run scraper
async function runContinuousScrapingF() {
  try {
    scrapeCount++;
    console.log(`\n📡 ${new Date().toISOString()} - SCRAPE #${scrapeCount} STARTING...`);
    
    const result = await scrapeEverything();
    
    console.log(`✅ SCRAPE #${scrapeCount} SUCCESS!`);
    console.log(`🔥 Fresh tokens: ${result.tokens?.length || 0}`);
    console.log(`📊 Fresh trades: ${result.trades?.length || 0}`);
    console.log(`⏰ Next scrape in 30 seconds...`);
    
  } catch (error) {
    console.error(`❌ SCRAPE #${scrapeCount} FAILED:`, error.message);
    console.log('⏰ Retrying in 30 seconds...');
  }
}

// Run initial scrape immediately
runContinuousScrapingF();

// Schedule scraping every 30 seconds
const scrapeInterval = setInterval(() => {
  runContinuousScrapingF();
}, 30000); // 30 seconds

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping continuous scraper...');
  clearInterval(scrapeInterval);
  console.log('✅ Auto-scraper stopped.');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Stopping continuous scraper...');
  clearInterval(scrapeInterval);
  console.log('✅ Auto-scraper stopped.');
  process.exit(0);
});

console.log('✅ Continuous scraper started! Running every 30 seconds...');