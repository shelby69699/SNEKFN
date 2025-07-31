import puppeteer from 'puppeteer';

async function debugDexHunterContent() {
  let browser = null;
  
  try {
    console.log('🔍 DEBUGGING DEXHUNTER PAGE CONTENT');
    
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
    
    console.log('⏳ Waiting for page to fully load...');
    await page.waitForTimeout(10000);
    
    // Debug the actual content of those 26 table rows
    const tableRowContent = await page.evaluate(() => {
      const rows = document.querySelectorAll('table tr');
      console.log(`Found ${rows.length} table rows`);
      
      const rowData = [];
      
      for (let i = 0; i < Math.min(10, rows.length); i++) {
        const row = rows[i];
        const cells = row.querySelectorAll('td, th');
        const rowText = row.textContent?.trim();
        
        rowData.push({
          index: i,
          cellCount: cells.length,
          text: rowText?.substring(0, 200),
          innerHTML: row.innerHTML.substring(0, 300)
        });
      }
      
      return rowData;
    });
    
    console.log('\n🔍 TABLE ROW ANALYSIS:');
    tableRowContent.forEach((row, i) => {
      console.log(`\nRow ${row.index}:`);
      console.log(`  Cells: ${row.cellCount}`);
      console.log(`  Text: "${row.text}"`);
      console.log(`  HTML: ${row.innerHTML.substring(0, 150)}...`);
    });
    
    // Look for any elements that might contain trade data
    const tradeDataSearch = await page.evaluate(() => {
      const bodyText = document.body.textContent;
      
      // Search for common trade indicators
      const hasADA = bodyText.includes('ADA');
      const hasSNEK = bodyText.includes('SNEK');
      const hasSwap = bodyText.includes('swap') || bodyText.includes('Swap');
      const hasTrade = bodyText.includes('trade') || bodyText.includes('Trade');
      const hasPrice = bodyText.match(/\$\d+/) || bodyText.match(/\d+\.\d+/);
      
      // Look for elements that might contain trade data
      const tradeElements = [];
      
      // Check for any divs with trade-like content
      const allDivs = document.querySelectorAll('div');
      for (let div of allDivs) {
        const text = div.textContent?.trim();
        if (text && text.length < 200 && (
          text.includes('ADA') || 
          text.includes('SNEK') || 
          text.includes('MIN') ||
          text.match(/\d+[smhd]/) || // time pattern
          text.match(/\$\d+/) // price pattern
        )) {
          tradeElements.push({
            text: text.substring(0, 100),
            className: div.className,
            innerHTML: div.innerHTML.substring(0, 200)
          });
        }
      }
      
      return {
        bodyLength: bodyText.length,
        hasADA,
        hasSNEK,
        hasSwap,
        hasTrade,
        hasPrice: !!hasPrice,
        tradeElementsFound: tradeElements.length,
        sampleTradeElements: tradeElements.slice(0, 5)
      };
    });
    
    console.log('\n🔍 TRADE DATA SEARCH:');
    console.log(`Body length: ${tradeDataSearch.bodyLength}`);
    console.log(`Has ADA: ${tradeDataSearch.hasADA}`);
    console.log(`Has SNEK: ${tradeDataSearch.hasSNEK}`);
    console.log(`Has Swap: ${tradeDataSearch.hasSwap}`);
    console.log(`Has Trade: ${tradeDataSearch.hasTrade}`);
    console.log(`Has Price: ${tradeDataSearch.hasPrice}`);
    console.log(`Trade elements found: ${tradeDataSearch.tradeElementsFound}`);
    
    if (tradeDataSearch.sampleTradeElements.length > 0) {
      console.log('\n🎯 SAMPLE TRADE ELEMENTS:');
      tradeDataSearch.sampleTradeElements.forEach((el, i) => {
        console.log(`\nTrade Element ${i}:`);
        console.log(`  Text: "${el.text}"`);
        console.log(`  Class: "${el.className}"`);
        console.log(`  HTML: ${el.innerHTML}...`);
      });
    }
    
    // Take a screenshot for manual inspection
    await page.screenshot({ path: 'dexhunter-debug.png', fullPage: true });
    console.log('\n📸 Screenshot saved as: dexhunter-debug.png');
    
    console.log('\n🔍 Browser will stay open for 30 seconds for manual inspection...');
    await page.waitForTimeout(30000);
    
    await browser.close();
    console.log('✅ Debug completed');
    
  } catch (error) {
    console.error('❌ Debug error:', error.message);
    if (browser) {
      setTimeout(async () => {
        await browser.close();
      }, 30000);
    }
  }
}

debugDexHunterContent();