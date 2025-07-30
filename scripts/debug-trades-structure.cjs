// Debug DexHunter trades page structure
const puppeteer = require('puppeteer');
const fs = require('fs');

async function debugTradesPage() {
  console.log('🔍 DEBUGGING DexHunter trades page structure...');
  
  const browser = await puppeteer.launch({ 
    headless: false,
    devtools: true 
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    console.log('📡 Going to DexHunter trades page...');
    await page.goto('https://app.dexhunter.io/trades', { 
      waitUntil: 'networkidle0',
      timeout: 60000 
    });
    
    // Wait longer for dynamic content
    console.log('⏳ Waiting for trades to load...');
    await new Promise(resolve => setTimeout(resolve, 15000));
    
    // Take screenshot
    await page.screenshot({ path: 'debug-structure.png', fullPage: true });
    console.log('📸 Screenshot saved: debug-structure.png');
    
    // Debug the page structure
    const debugInfo = await page.evaluate(() => {
      const info = {
        title: document.title,
        url: window.location.href,
        tables: [],
        allRows: [],
        possibleTradeElements: []
      };
      
      // Find all tables
      const tables = document.querySelectorAll('table');
      tables.forEach((table, i) => {
        const rows = table.querySelectorAll('tr');
        info.tables.push({
          index: i,
          rows: rows.length,
          firstRowText: rows[0]?.innerText?.slice(0, 100),
          hasTableBody: !!table.querySelector('tbody'),
          className: table.className
        });
      });
      
      // Find all rows (any tr elements)
      const allRows = document.querySelectorAll('tr');
      allRows.forEach((row, i) => {
        const cells = row.querySelectorAll('td, th');
        if (cells.length > 0) {
          info.allRows.push({
            index: i,
            cellCount: cells.length,
            text: row.innerText?.slice(0, 150),
            hasTimePattern: /\d+[smh]\s*ago/.test(row.innerText || ''),
            hasBuySell: /(Buy|Sell)/.test(row.innerText || ''),
            className: row.className
          });
        }
      });
      
      // Look for elements that might contain trade data
      const possibleSelectors = [
        '[class*="trade"]',
        '[class*="Trade"]',
        '[class*="row"]',
        '[class*="Row"]',
        '[data-testid*="trade"]',
        '[role="row"]',
        'div:contains("ago")',
        'div:contains("Buy")',
        'div:contains("Sell")'
      ];
      
      possibleSelectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector);
          if (elements.length > 0) {
            info.possibleTradeElements.push({
              selector: selector,
              count: elements.length,
              sampleText: elements[0]?.innerText?.slice(0, 100)
            });
          }
        } catch (e) {
          // Ignore invalid selectors
        }
      });
      
      return info;
    });
    
    console.log('🔍 DEBUG INFO:');
    console.log('📄 Page title:', debugInfo.title);
    console.log('🌐 URL:', debugInfo.url);
    console.log('📊 Tables found:', debugInfo.tables.length);
    
    debugInfo.tables.forEach((table, i) => {
      console.log(`  Table ${i}: ${table.rows} rows, class: "${table.className}"`);
      console.log(`    First row: "${table.firstRowText}"`);
    });
    
    console.log('\n📋 All rows found:', debugInfo.allRows.length);
    const tradesLikeRows = debugInfo.allRows.filter(row => 
      row.hasTimePattern && row.hasBuySell && row.cellCount >= 8
    );
    
    console.log('🎯 Rows that look like trades:', tradesLikeRows.length);
    tradesLikeRows.slice(0, 5).forEach((row, i) => {
      console.log(`  Row ${i}: ${row.cellCount} cells - "${row.text}"`);
    });
    
    console.log('\n🔍 Possible trade elements:');
    debugInfo.possibleTradeElements.forEach(elem => {
      console.log(`  ${elem.selector}: ${elem.count} elements`);
      if (elem.sampleText) {
        console.log(`    Sample: "${elem.sampleText}"`);
      }
    });
    
    // Save full page source for inspection
    const pageSource = await page.content();
    fs.writeFileSync('debug-trades-full-source.html', pageSource);
    console.log('📄 Full page source saved: debug-trades-full-source.html');
    
    return debugInfo;
    
  } catch (error) {
    console.error('❌ Debug error:', error);
  } finally {
    await browser.close();
  }
}

// Run the debug
debugTradesPage()
  .then(info => {
    console.log('\n✅ Debug complete! Check the files for more details.');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Debug failed:', error);
    process.exit(1);
  });