const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data storage
let currentData = {
  tokens: [],
  trades: [],
  stats: {},
  lastUpdated: null
};

// Scraper management
let scraperProcess = null;
let scraperInterval = null;

// Helper function to read and parse data files
const readDataFile = (filename) => {
  try {
    const filePath = path.join(__dirname, '..', 'src', 'data', filename);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Extract exported data from JavaScript file
      if (filename.includes('tokens') || filename.includes('data')) {
        const tokensMatch = content.match(/export const DEXHUNTER_TOKENS = (\[[\s\S]*?\]);/);
        const statsMatch = content.match(/export const DEX_STATS = (\{[\s\S]*?\});/);
        
        return {
          tokens: tokensMatch ? JSON.parse(tokensMatch[1]) : [],
          stats: statsMatch ? JSON.parse(statsMatch[1]) : {}
        };
      } else if (filename.includes('trades')) {
        const tradesMatch = content.match(/export const DEXHUNTER_TRADES = (\[[\s\S]*?\]);/);
        return {
          trades: tradesMatch ? JSON.parse(tradesMatch[1]) : []
        };
      }
    }
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
  }
  return null;
};

// Function to update data from files
const updateDataFromFiles = () => {
  try {
    const tokensData = readDataFile('dexhunter-data.js');
    const tradesData = readDataFile('dexhunter-trades.js');
    
    if (tokensData) {
      currentData.tokens = tokensData.tokens || [];
      currentData.stats = tokensData.stats || {};
    }
    
    if (tradesData) {
      currentData.trades = tradesData.trades || [];
    }
    
    currentData.lastUpdated = new Date().toISOString();
    console.log(`Data updated at ${currentData.lastUpdated}`);
    console.log(`Tokens: ${currentData.tokens.length}, Trades: ${currentData.trades.length}`);
  } catch (error) {
    console.error('Error updating data:', error);
  }
};

// Function to run scraper
const runScraper = () => {
  return new Promise((resolve, reject) => {
    console.log('Starting scraper...');
    
    const scraperPath = path.join(__dirname, '..', 'scripts', 'scrape-both.cjs');
    const scraper = spawn('node', [scraperPath], {
      stdio: 'pipe',
      cwd: path.join(__dirname, '..')
    });
    
    let output = '';
    let errorOutput = '';
    
    scraper.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    scraper.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });
    
    scraper.on('close', (code) => {
      if (code === 0) {
        console.log('Scraper completed successfully');
        updateDataFromFiles();
        resolve(output);
      } else {
        console.error('Scraper failed with code:', code);
        console.error('Error output:', errorOutput);
        reject(new Error(`Scraper failed with code ${code}`));
      }
    });
    
    // Timeout after 2 minutes
    setTimeout(() => {
      scraper.kill();
      reject(new Error('Scraper timeout'));
    }, 120000);
  });
};

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    lastUpdated: currentData.lastUpdated,
    dataCount: {
      tokens: currentData.tokens.length,
      trades: currentData.trades.length
    }
  });
});

app.get('/api/tokens', (req, res) => {
  res.json({
    tokens: currentData.tokens,
    lastUpdated: currentData.lastUpdated
  });
});

app.get('/api/trades', (req, res) => {
  res.json({
    trades: currentData.trades,
    lastUpdated: currentData.lastUpdated
  });
});

app.get('/api/stats', (req, res) => {
  res.json({
    stats: currentData.stats,
    lastUpdated: currentData.lastUpdated
  });
});

app.get('/api/data', (req, res) => {
  res.json(currentData);
});

// Manual scraper trigger
app.post('/api/scrape', async (req, res) => {
  try {
    await runScraper();
    res.json({
      success: true,
      message: 'Scraper completed successfully',
      lastUpdated: currentData.lastUpdated,
      dataCount: {
        tokens: currentData.tokens.length,
        trades: currentData.trades.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Auto scraper control
app.post('/api/auto-scraper/start', (req, res) => {
  if (scraperInterval) {
    return res.json({ message: 'Auto scraper already running' });
  }
  
  // Run immediately
  runScraper().catch(console.error);
  
  // Set up interval (every 30 seconds)
  scraperInterval = setInterval(() => {
    runScraper().catch(console.error);
  }, 30000);
  
  res.json({ message: 'Auto scraper started' });
});

app.post('/api/auto-scraper/stop', (req, res) => {
  if (scraperInterval) {
    clearInterval(scraperInterval);
    scraperInterval = null;
  }
  
  res.json({ message: 'Auto scraper stopped' });
});

app.get('/api/auto-scraper/status', (req, res) => {
  res.json({
    running: !!scraperInterval,
    lastUpdated: currentData.lastUpdated
  });
});

// Initialize data on startup
updateDataFromFiles();

// Start auto scraper by default
setTimeout(() => {
  console.log('Starting auto scraper...');
  runScraper().catch(console.error);
  
  scraperInterval = setInterval(() => {
    runScraper().catch(console.error);
  }, 30000);
}, 5000); // Wait 5 seconds after server starts

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  if (scraperInterval) {
    clearInterval(scraperInterval);
  }
  process.exit(0);
});

module.exports = app;