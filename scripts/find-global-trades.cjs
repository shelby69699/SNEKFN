// Find the REAL DexHunter global trades page
const puppeteer = require('puppeteer');

async function findGlobalTrades() {
  console.log('🔥 FINDING REAL GLOBAL TRADES PAGE!');
  
  const browser = await puppeteer.launch({ 
    headless: false,
    devtools: true 
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Try different URLs that might have global trades
    const urlsToTry = [
      'https://app.dexhunter.io/',
      'https://app.dexhunter.io/trades',
      'https://app.dexhunter.io/global',
      'https://app.dexhunter.io/orders',
      'https://app.dexhunter.io/swap',
      'https://app.dexhunter.io/live',
      'https://dexhunter.io/trades',
      'https://dexhunter.io/'
    ];
    
    for (const url of urlsToTry) {
      try {
        console.log(`\n🎯 Trying: ${url}`);
        await page.goto(url, { 
          waitUntil: 'networkidle0',
          timeout: 30000 
        });
        
        await new Promise(resolve => setTimeout(resolve, 8000));
        
        const finalUrl = page.url();
        console.log(`📍 Final URL: ${finalUrl}`);
        
        // Look for trades table with the exact structure from screenshot
        const tradesInfo = await page.evaluate(() => {
          // Look for table with TIME, TYPE, PAIR columns
          const tables = document.querySelectorAll('table');
          const tableInfo = [];
          
          tables.forEach((table, i) => {
            const headerRow = table.querySelector('tr');
            const headerText = headerRow?.innerText || '';
            
            // Check if this looks like the global trades table
            const hasTimeColumn = headerText.includes('TIME');
            const hasTypeColumn = headerText.includes('TYPE');
            const hasPairColumn = headerText.includes('PAIR');
            const hasInColumn = headerText.includes('IN');
            const hasOutColumn = headerText.includes('OUT');
            
            const isTradesTable = hasTimeColumn && hasTypeColumn && hasPairColumn;
            
            const rows = table.querySelectorAll('tbody tr');
            let sampleTrades = [];
            
            if (isTradesTable && rows.length > 0) {
              // Get sample trade data
              for (let j = 0; j < Math.min(3, rows.length); j++) {
                const row = rows[j];
                const cells = row.querySelectorAll('td');
                if (cells.length >= 8) {
                  const cellTexts = Array.from(cells).map(cell => cell.innerText?.trim());
                  sampleTrades.push(cellTexts);
                }
              }
            }
            
            tableInfo.push({
              index: i,
              headerText: headerText.slice(0, 100),
              isTradesTable: isTradesTable,
              totalRows: rows.length,
              sampleTrades: sampleTrades,
              className: table.className
            });
          });
          
          return {
            url: window.location.href,
            title: document.title,
            tables: tableInfo,
            hasGlobalTrades: tableInfo.some(t => t.isTradesTable && t.totalRows > 0)
          };
        });
        
        console.log(`📊 Found ${tradesInfo.tables.length} tables`);
        
        tradesInfo.tables.forEach((table, i) => {
          console.log(`  Table ${i}: ${table.isTradesTable ? '🎯 TRADES TABLE!' : '❌ Not trades'}`);
          console.log(`    Header: "${table.headerText}"`);
          console.log(`    Rows: ${table.totalRows}`);
          
          if (table.sampleTrades.length > 0) {
            console.log(`    Sample trade:`);
            table.sampleTrades[0].forEach((cell, j) => {
              console.log(`      Cell ${j}: "${cell}"`);
            });
          }
        });
        
        if (tradesInfo.hasGlobalTrades) {
          console.log('🎉 FOUND GLOBAL TRADES PAGE!');
          await page.screenshot({ path: `global-trades-${Date.now()}.png`, fullPage: true });
          
          return {
            url: finalUrl,
            tradesInfo: tradesInfo
          };
        }
        
      } catch (error) {
        console.log(`❌ Error with ${url}: ${error.message}`);
      }
    }
    
    console.log('❌ NO GLOBAL TRADES FOUND IN ANY URL!');
    return null;
    
  } catch (error) {
    console.error('❌ Search error:', error);
  } finally {
    await browser.close();
  }
}

// Run the search
findGlobalTrades()
  .then(result => {
    if (result) {
      console.log(`\n✅ FOUND GLOBAL TRADES AT: ${result.url}`);
    } else {
      console.log('\n❌ NO GLOBAL TRADES FOUND!');
    }
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Search failed:', error);
    process.exit(1);
  });