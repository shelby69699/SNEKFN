import puppeteer from 'puppeteer';

// Real Cardano token data with proper metadata
const tokenData = {
  'ADA': { name: 'Cardano', icon: '🔷', price: 0.45 },
  'SNEK': { name: 'Snek', icon: '🐍', price: 0.00089 },
  'HOSKY': { name: 'Hosky Token', icon: '🐕', price: 0.000456 },
  'MIN': { name: 'Minswap', icon: '⚡', price: 0.0234 },
  'AGIX': { name: 'SingularityNET', icon: '🤖', price: 0.0567 },
  'DJED': { name: 'Djed', icon: '💰', price: 1.00 },
  'WMT': { name: 'World Mobile Token', icon: '🌍', price: 0.0123 },
  'MILK': { name: 'MuesliSwap MILK', icon: '🥛', price: 0.00234 },
  'CLAY': { name: 'Clay Token', icon: '🏺', price: 0.00456 },
  'HUNT': { name: 'Hunt Token', icon: '🏹', price: 0.00789 },
  'BOOK': { name: 'Book Token', icon: '📚', price: 0.00345 },
  'NEWM': { name: 'NEWM', icon: '🎵', price: 0.00567 },
  'VYFI': { name: 'VyFinance', icon: '💎', price: 0.00123 },
  'COPI': { name: 'Cornucopias', icon: '🌽', price: 0.00234 },
  'OPTIM': { name: 'Optim Token', icon: '⚡', price: 0.00456 }
};

// DEBUG SCRAPER - SINGLE RUN
async function debugScrapeDexHunter() {
  let browser = null;
  
  try {
    console.log('🔥 DEBUG SCRAPER - SINGLE RUN');
    console.log('🚀 Starting REAL DexHunter scraping on LOCAL PC...');
    console.log('🔍 DEBUG MODE: Will analyze page structure in detail');
    
    // Launch browser with debugging enabled
    browser = await puppeteer.launch({
      headless: false, // VISIBLE BROWSER for debugging
      devtools: false,
      slowMo: 100, // Slow down by 100ms
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor'
      ]
    });
    
    const page = await browser.newPage();
    
    // Set user agent and viewport
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setViewport({ width: 1920, height: 1080 });
    
    console.log('🌐 Navigating to DexHunter trades page...');
    
    // Navigate to CORRECT DexHunter URL
    await page.goto('https://app.dexhunter.io/', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    console.log('⏳ Waiting for React app to load...');
    
    // Wait for the "Connecting" spinner to disappear (app loaded)
    try {
      await page.waitForFunction(() => {
        const text = document.body.textContent;
        return !text.includes('Connecting') && text.length > 100;
      }, { timeout: 20000 });
      console.log('✅ App loaded - "Connecting" spinner gone');
    } catch (error) {
      console.log('⚠️ Timeout waiting for app to load, continuing anyway...');
    }
    
    // Additional wait for dynamic content
    await page.waitForTimeout(10000);
    
    // Try to find and click navigation elements
    try {
      console.log('🔍 Looking for navigation elements...');
      
      // Check for any clickable elements that might lead to trades
      const navElements = await page.evaluate(() => {
        const elements = document.querySelectorAll('a, button, [role="button"], [onclick]');
        return Array.from(elements).map(el => ({
          text: el.textContent?.trim(),
          href: el.href,
          className: el.className,
          id: el.id
        })).filter(el => el.text && el.text.length < 50);
      });
      
      console.log('🎯 Found navigation elements:', navElements.length);
      navElements.forEach((el, i) => {
        console.log(`Nav ${i}: "${el.text}" | href: ${el.href} | class: ${el.className}`);
      });
      
      // Try to click on anything trade-related
      const tradeElement = await page.$('a:contains("Trade"), button:contains("Trade"), a:contains("Swap"), button:contains("Swap"), [href*="trade"], [href*="swap"]');
      if (tradeElement) {
        console.log('🎯 Found trade-related element, clicking...');
        await tradeElement.click();
        await page.waitForTimeout(5000);
      }
      
    } catch (error) {
      console.log('ℹ️ Navigation search error:', error.message);
    }
    
    console.log('🔍 DEBUG: Analyzing page structure...');
    
    // Debug: Check what's actually on the page
    const pageTitle = await page.title();
    console.log(`📄 Page title: ${pageTitle}`);
    
    const url = page.url();
    console.log(`🌐 Current URL: ${url}`);
    
    // Try multiple possible selectors
    const possibleSelectors = [
      'div[role="row"]',
      'table tr',
      '.trade-row',
      '[data-testid="trade-row"]',
      '.MuiDataGrid-row',
      '.ag-row',
      'tbody tr',
      '[role="gridcell"]',
      '.trade-item',
      '.trades-list tr',
      '.trades-table tr',
      '[data-field]',
      '.css-1hwfws3',
      '.css-12wnr2w',
      '[class*="row"]',
      '[class*="trade"]'
    ];
    
    let foundSelector = null;
    let elements = [];
    
    for (const selector of possibleSelectors) {
      try {
        console.log(`🔍 Testing selector: ${selector}`);
        const els = await page.$$(selector);
        console.log(`   Found ${els.length} elements`);
        
        if (els.length > 5) { // Need at least a few elements
          foundSelector = selector;
          elements = els;
          console.log(`✅ SUCCESS: Found elements with selector: ${selector}`);
          break;
        }
      } catch (error) {
        console.log(`   ❌ Failed: ${error.message}`);
      }
    }
    
    if (!foundSelector) {
      console.log('🔍 No standard selectors found. Dumping page content...');
      
      // Get page body content for analysis
      const bodyHTML = await page.evaluate(() => {
        return document.body.innerHTML.substring(0, 3000); // First 3000 chars
      });
      
      console.log('📄 Page body content (first 3000 chars):');
      console.log(bodyHTML);
      
      // Try to find any table-like structures
      const tableElements = await page.evaluate(() => {
        const tables = document.querySelectorAll('table, [role="grid"], [role="table"], .grid, .table, [class*="grid"], [class*="table"]');
        return Array.from(tables).map((el, index) => ({
          index,
          tagName: el.tagName,
          className: el.className,
          id: el.id,
          innerHTML: el.innerHTML.substring(0, 500)
        }));
      });
      
      console.log('🔍 Found table-like elements:', tableElements.length);
      tableElements.forEach((el, i) => {
        console.log(`Table ${i}: ${el.tagName}.${el.className}#${el.id}`);
        console.log(`  Content preview: ${el.innerHTML.substring(0, 200)}`);
      });
      
      // Try to find any elements with trade-related text
      const tradeElements = await page.evaluate(() => {
        const allElements = document.querySelectorAll('*');
        const tradeRelated = [];
        
        Array.from(allElements).forEach((el, index) => {
          const text = el.textContent || '';
          if (text.match(/ADA|SNEK|HOSKY|MIN|swap|trade|\d+[smhd]/i) && text.length < 100) {
            tradeRelated.push({
              tagName: el.tagName,
              className: el.className,
              id: el.id,
              text: text.trim(),
              outerHTML: el.outerHTML.substring(0, 200)
            });
          }
        });
        
        return tradeRelated.slice(0, 20); // First 20 matches
      });
      
      console.log('🔍 Found trade-related elements:', tradeElements.length);
      tradeElements.forEach((el, i) => {
        console.log(`Trade element ${i}: ${el.tagName}.${el.className} - "${el.text}"`);
      });
      
      console.log('❌ Could not find trade data elements. Browser will stay open for manual inspection.');
      console.log('🔍 Please inspect the page manually and press any key to continue...');
      
      // Keep browser open for manual inspection
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.on('data', () => {
        process.exit();
      });
      
      return;
    }
    
    console.log(`📊 Extracting trade data using selector: ${foundSelector}...`);
    console.log(`🔍 Found ${elements.length} elements total`);
    
    // Let browser stay open for debugging
    console.log('🔍 Browser will stay open for 30 seconds for inspection...');
    await page.waitForTimeout(30000);
    
    await browser.close();
    console.log('✅ Debug scraper completed');
    
  } catch (error) {
    console.error('❌ DEBUG Scraper error:', error.message);
    
    if (browser) {
      console.log('🔍 Keeping browser open for inspection...');
      setTimeout(async () => {
        await browser.close();
        process.exit(1);
      }, 30000);
    }
  }
}

// Run the debug scraper
debugScrapeDexHunter();