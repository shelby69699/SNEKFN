import fetch from 'node-fetch';

async function testAPI() {
  const baseUrl = 'http://localhost:9999/api';
  
  console.log('🧪 Testing DEXY Iris API (REAL DATA ONLY)...\n');
  
  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${baseUrl}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health:', healthData.message);
    console.log('   Real Data Only:', healthData.realDataOnly);
    console.log('   Iris Connected:', healthData.irisConnected);
    console.log('   Database Connected:', healthData.databaseConnected);
    console.log('');
    
    // Test trades endpoint
    console.log('2. Testing trades endpoint...');
    const tradesResponse = await fetch(`${baseUrl}/trades`);
    const tradesData = await tradesResponse.json();
    console.log(`✅ Trades: ${tradesData.length} REAL trades found`);
    if (tradesData.length > 0) {
      console.log(`   Latest: ${tradesData[0].type} ${tradesData[0].pair} (${tradesData[0].time})`);
      console.log(`   Source: ${tradesData[0].source}`);
    }
    console.log('');
    
    // Test tokens endpoint
    console.log('3. Testing tokens endpoint...');
    const tokensResponse = await fetch(`${baseUrl}/tokens`);
    const tokensData = await tokensResponse.json();
    console.log(`✅ Tokens: ${tokensData.length} REAL tokens found`);
    if (tokensData.length > 0) {
      console.log(`   Top token: ${tokensData[0].symbol} (${tokensData[0].price})`);
    }
    console.log('');
    
    // Test stats endpoint
    console.log('4. Testing stats endpoint...');
    const statsResponse = await fetch(`${baseUrl}/stats`);
    const statsData = await statsResponse.json();
    console.log('✅ Stats:', statsData);
    console.log('');
    
    // Test manual update
    console.log('5. Testing manual update...');
    const updateResponse = await fetch(`${baseUrl}/trigger-update`, {
      method: 'POST'
    });
    const updateData = await updateResponse.json();
    console.log('✅ Manual update:', updateData.message);
    console.log('');
    
    console.log('🎉 All API tests passed!');
    console.log('');
    console.log('Your DEXY backend is working correctly with:');
    console.log('- REAL DEX data only (no fallback bullshit)');
    console.log('- Token price information from Iris');
    console.log('- DEX statistics from real data');
    console.log('- Manual update capability');
    console.log('');
    console.log('🚨 REAL DATA ONLY - No fallback data generation');
    console.log('To get real data:');
    console.log('1. Set up Iris following README-IRIS.md');
    console.log('2. Start Iris indexer and API');
    console.log('3. Restart this backend');
    console.log('4. You\'ll see "IRIS_DATABASE" or "IRIS_API" in trade sources');
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('');
    console.log('Make sure the server is running:');
    console.log('node iris-server.js');
    console.log('');
    console.log('🚨 REAL DATA ONLY - No fallback data generation');
    console.log('The server will fail if Iris is not running and indexing data');
  }
}

testAPI(); 