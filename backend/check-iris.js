import fetch from 'node-fetch';

async function checkIrisStatus() {
  console.log('🔍 Checking Iris status...');
  
  try {
    // Check Iris API
    const apiResponse = await fetch('http://localhost:3001/api/health');
    if (apiResponse.ok) {
      console.log('✅ Iris API is running');
    } else {
      console.log('❌ Iris API is not responding');
    }
  } catch (error) {
    console.log('❌ Iris API is not available');
  }
  
  try {
    // Check WebSocket
    const WebSocket = (await import('ws')).default;
    const ws = new WebSocket('ws://localhost:8080');
    
    ws.on('open', () => {
      console.log('✅ Iris WebSocket is running');
      ws.close();
    });
    
    ws.on('error', () => {
      console.log('❌ Iris WebSocket is not available');
    });
  } catch (error) {
    console.log('❌ Iris WebSocket is not available');
  }
}

checkIrisStatus();
