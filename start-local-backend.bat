@echo off
echo 🚀 DEXY LOCAL BACKEND STARTUP
echo =============================
echo.
echo 📦 Installing dependencies...
cd backend
call npm install
echo.
echo 🔄 Starting local backend server...
echo 🌐 Backend will run on: http://localhost:3001
echo 📊 Frontend on Vercel will connect to this local backend
echo 🔥 Real DexHunter scraping every 10 seconds!
echo.
echo Press Ctrl+C to stop the backend
echo.
call npm start
pause