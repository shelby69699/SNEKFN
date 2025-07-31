@echo off
echo ===================================
echo    🚀 DEXY BACKEND STARTUP 
echo ===================================
echo.
echo 📍 Current Directory: %CD%
echo 📦 Installing dependencies...
call npm install
echo.
echo 🔥 Starting DEXY Backend with REAL DexHunter scraping...
echo 🌐 Backend URL: http://localhost:3001
echo 📊 Will scrape: https://app.dexhunter.io/
echo 🔄 Updates every 10 seconds
echo.
echo ⚠️  BROWSER WINDOW WILL OPEN for scraping
echo ⚠️  Your Vercel frontend will connect automatically
echo.
echo 🚀 Starting server...
node server.js
pause