import puppeteer from 'puppeteer';

async function debugTableContent() {
  let browser = null;
  
  try {
    console.log('🔍 DEBUGGING DEXHUNTER TABLE CONTENT');
    
    browser = await puppeteer.launch({
      headless: false, // Keep visible
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    console.log('🌐 Loading DexHunter...');
    await page.goto('https://app.dexhunter.io/', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    console.log('⏳ Waiting for page to load...');
    await page.waitForTimeout(15000); // Wait longer
    
    // Debug ALL table content in detail
    const tableDebug = await page.evaluate(() => {
      const tables = document.querySelectorAll('table');
      console.log(`Found ${tables.length} tables on page`);
      
      const tableData = [];
      
      tables.forEach((table, tableIndex) => {
        const rows = table.querySelectorAll('tr');
        console.log(`Table ${tableIndex}: ${rows.length} rows`);
        
        const tableInfo = {
          tableIndex,
          rowCount: rows.length,
          tableHTML: table.innerHTML.substring(0, 500),
          rows: []
        };
        
        rows.forEach((row, rowIndex) => {
          if (rowIndex < 10) { // First 10 rows only
            const cells = row.querySelectorAll('td, th');
            const rowInfo = {
              rowIndex,
              cellCount: cells.length,
              rowText: row.textContent?.trim().substring(0, 200),
              cells: []
            };
            
            cells.forEach((cell, cellIndex) => {
              if (cellIndex < 10) { // First 10 cells only
                rowInfo.cells.push({
                  cellIndex,
                  text: cell.textContent?.trim(),
                  innerHTML: cell.innerHTML.substring(0, 100)
                });
              }
            });
            
            tableInfo.rows.push(rowInfo);
          }
        });
        
        tableData.push(tableInfo);
      });
      
      return tableData;
    });
    
    console.log('\n🔍 TABLE ANALYSIS:');
    tableDebug.forEach((table, i) => {
      console.log(`\n--- TABLE ${i} ---`);
      console.log(`Rows: ${table.rowCount}`);
      console.log(`HTML preview: ${table.tableHTML.substring(0, 200)}...`);
      
      table.rows.forEach((row, j) => {
        console.log(`\n  Row ${j} (${row.cellCount} cells):`);
        console.log(`    Text: "${row.rowText}"`);
        
        if (row.cells.length > 0) {
          console.log(`    Cells:`);
          row.cells.forEach((cell, k) => {
            console.log(`      [${k}]: "${cell.text}"`);
          });
        }
      });
    });
    
    // Look for specific trade indicators
    const tradeSearch = await page.evaluate(() => {
      const bodyText = document.body.textContent;
      
      // Look for elements containing trade-like text
      const elements = document.querySelectorAll('*');
      const tradeElements = [];
      
      for (let el of elements) {
        const text = el.textContent?.trim();
        if (text && text.length < 100 && (
          text.includes('ago') ||
          text.includes('ADA') ||
          text.includes('Buy') ||
          text.includes('Sell') ||
          text.match(/\d+\.?\d*\s*(ADA|DONK|SPLASH|BO_RT)/)
        )) {
          tradeElements.push({
            tagName: el.tagName,
            className: el.className,
            text: text,
            innerHTML: el.innerHTML.substring(0, 200)
          });
        }
      }
      
      return {
        bodyLength: bodyText.length,
        tradeElementsFound: tradeElements.length,
        sampleElements: tradeElements.slice(0, 10)
      };
    });
    
    console.log('\n🔍 TRADE ELEMENT SEARCH:');
    console.log(`Body length: ${tradeSearch.bodyLength}`);
    console.log(`Trade elements found: ${tradeSearch.tradeElementsFound}`);
    
    if (tradeSearch.sampleElements.length > 0) {
      console.log('\n🎯 SAMPLE TRADE ELEMENTS:');
      tradeSearch.sampleElements.forEach((el, i) => {
        console.log(`\n${i + 1}. ${el.tagName}.${el.className}`);
        console.log(`   Text: "${el.text}"`);
        console.log(`   HTML: ${el.innerHTML.substring(0, 150)}...`);
      });
    }
    
    console.log('\n🔍 Browser will stay open for 60 seconds for manual inspection...');
    await page.waitForTimeout(60000);
    
    await browser.close();
    console.log('✅ Debug completed');
    
  } catch (error) {
    console.error('❌ Debug error:', error.message);
    if (browser) {
      setTimeout(async () => {
        await browser.close();
      }, 60000);
    }
  }
}

debugTableContent();