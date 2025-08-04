#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Setting up Iris Cardano DEX Indexer for DEXY...\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Please run this script from the backend directory');
  process.exit(1);
}

// Create .env file if it doesn't exist
const envPath = '.env';
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file...');
  const envContent = `# Iris Configuration
IRIS_API_URL=http://localhost:3001
IRIS_WS_URL=ws://localhost:8080

# MySQL Database Configuration
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=iris
MYSQL_PORT=3306

# Server Configuration
PORT=9999
NODE_ENV=development
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env file');
} else {
  console.log('✅ .env file already exists');
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed');
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message);
  process.exit(1);
}

// Create Iris setup instructions
console.log('\n📋 Iris Setup Instructions:');
console.log('==========================');
console.log('1. Clone Iris repository:');
console.log('   git clone https://github.com/Flux-Point-Studios/iris.git');
console.log('   cd iris');
console.log('');
console.log('2. Install Iris dependencies:');
console.log('   npm install');
console.log('');
console.log('3. Build Iris:');
console.log('   npm run build');
console.log('');
console.log('4. Set up MySQL database:');
console.log('   - Create a MySQL database named "iris"');
console.log('   - Update the .env file with your MySQL credentials');
console.log('');
console.log('5. Set up Ogmios instance:');
console.log('   - Install and configure Ogmios for Cardano node connection');
console.log('   - Update the .env file with Ogmios connection details');
console.log('');
console.log('6. Start Iris indexer:');
console.log('   npm run indexer');
console.log('');
console.log('7. Start Iris API:');
console.log('   npm run api');
console.log('');
console.log('8. Start DEXY backend:');
console.log('   npm start');
console.log('');

// Create a quick start script
const quickStartScript = `#!/bin/bash
echo "🚀 Quick Start for DEXY with Iris"
echo "=================================="
echo ""
echo "1. Make sure Iris is running:"
echo "   - Iris indexer: npm run indexer (in iris directory)"
echo "   - Iris API: npm run api (in iris directory)"
echo ""
echo "2. Start DEXY backend:"
echo "   npm start"
echo ""
echo "3. Your frontend will automatically connect to the backend"
echo "   - Local: http://localhost:5173"
echo "   - Production: https://snekfn.vercel.app"
echo ""
echo "4. Check backend health:"
echo "   curl http://localhost:9999/api/health"
echo ""
`;

fs.writeFileSync('quick-start.sh', quickStartScript);
fs.chmodSync('quick-start.sh', '755');
console.log('✅ Created quick-start.sh script');

// Create Iris status checker
const statusChecker = `import fetch from 'node-fetch';

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
`;

fs.writeFileSync('check-iris.js', statusChecker);
console.log('✅ Created check-iris.js script');

console.log('\n🎉 Setup complete!');
console.log('');
console.log('Next steps:');
console.log('1. Set up Iris following the instructions above');
console.log('2. Run: node check-iris.js (to verify Iris is running)');
console.log('3. Run: npm start (to start DEXY backend)');
console.log('4. Your frontend will automatically connect to real DEX data!');
console.log('');
console.log('For help, see: https://github.com/Flux-Point-Studios/iris'); 