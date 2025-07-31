// AUTO-DEPLOYING DexHunter scraper - Scrapes, commits, and pushes every 30 seconds
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting AUTO-DEPLOYING DexHunter scraper...');
console.log('⏰ Will scrape, commit & push FRESH trades every 30 seconds');
console.log('🔥 Press Ctrl+C to stop');
console.log('📡 This will auto-deploy to Vercel on every update!');

let scrapeCount = 0;

async function runScrapeAndDeploy() {
  scrapeCount++;
  const timestamp = new Date().toISOString();
  
  console.log(`📡 ${timestamp} - SCRAPE & DEPLOY #${scrapeCount} STARTING...`);
  
  try {
    // Step 1: Run the scraper
    console.log('🔥 STEP 1: Running scraper...');
    await runCommand('node', ['scripts/scrape-both.cjs']);
    
    // Step 2: Add changes to git
    console.log('📝 STEP 2: Adding changes to git...');
    await runCommand('git', ['add', 'src/data/']);
    
    // Step 3: Check if there are changes to commit
    const statusResult = await runCommand('git', ['status', '--porcelain'], true);
    if (statusResult.trim()) {
      // Step 4: Commit changes
      console.log('💾 STEP 3: Committing fresh data...');
      await runCommand('git', ['commit', '-m', `update: LIVE TRADES BATCH #${scrapeCount} - ${timestamp}`]);
      
      // Step 5: Push to trigger Vercel deployment
      console.log('🚀 STEP 4: Pushing to trigger Vercel deployment...');
      await runCommand('git', ['push', 'origin', 'main']);
      
      console.log(`✅ SCRAPE & DEPLOY #${scrapeCount} SUCCESS!`);
      console.log(`🔥 Fresh data deployed to Vercel!`);
    } else {
      console.log(`ℹ️  SCRAPE #${scrapeCount} - No changes detected, skipping commit`);
    }
    
  } catch (error) {
    console.error(`❌ SCRAPE & DEPLOY #${scrapeCount} FAILED:`, error.message);
  }
  
  console.log(`⏰ Next scrape & deploy in 30 seconds...`);
}

function runCommand(command, args, returnOutput = false) {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, { 
      stdio: returnOutput ? 'pipe' : 'inherit',
      shell: true 
    });
    
    let output = '';
    
    if (returnOutput) {
      process.stdout.on('data', (data) => {
        output += data.toString();
      });
    }
    
    process.on('close', (code) => {
      if (code === 0) {
        resolve(returnOutput ? output : null);
      } else {
        reject(new Error(`Command "${command} ${args.join(' ')}" failed with code ${code}`));
      }
    });
    
    process.on('error', (error) => {
      reject(error);
    });
  });
}

// Start the continuous scrape & deploy cycle
async function startContinuousScrapeAndDeploy() {
  // Run immediately
  await runScrapeAndDeploy();
  
  // Then run every 30 seconds
  setInterval(runScrapeAndDeploy, 30000);
}

startContinuousScrapeAndDeploy().catch(console.error);