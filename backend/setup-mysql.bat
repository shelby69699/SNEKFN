@echo off
echo ========================================
echo    MySQL Setup for Iris
echo ========================================
echo.

REM Check if MySQL is installed
echo Checking MySQL installation...
mysql --version >nul 2>&1
if errorlevel 1 (
    echo ❌ MySQL not found!
    echo.
    echo Please install MySQL first:
    echo 1. Go to: https://dev.mysql.com/downloads/installer/
    echo 2. Download "MySQL Installer for Windows"
    echo 3. Run as Administrator
    echo 4. Choose "Developer Default" or "Server only"
    echo 5. Set root password (remember this!)
    echo.
    pause
    exit /b 1
)

echo ✅ MySQL found!
echo.

REM Start MySQL service
echo Starting MySQL service...
net start mysql80 >nul 2>&1
if errorlevel 1 (
    echo ⚠️ Could not start MySQL80, trying mysql...
    net start mysql >nul 2>&1
    if errorlevel 1 (
        echo ❌ Could not start MySQL service
        echo Please start MySQL manually from Services
        pause
        exit /b 1
    )
)

echo ✅ MySQL service started!
echo.

REM Create database and user
echo Creating Iris database and user...
echo (You'll be prompted for MySQL root password)
echo.

mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS iris; CREATE USER IF NOT EXISTS 'iris_user'@'localhost' IDENTIFIED BY 'iris_password'; GRANT ALL PRIVILEGES ON iris.* TO 'iris_user'@'localhost'; FLUSH PRIVILEGES;" 2>nul

if errorlevel 1 (
    echo ❌ Failed to create database
    echo Please run manually:
    echo mysql -u root -p
    echo CREATE DATABASE iris;
    echo CREATE USER 'iris_user'@'localhost' IDENTIFIED BY 'iris_password';
    echo GRANT ALL PRIVILEGES ON iris.* TO 'iris_user'@'localhost';
    echo FLUSH PRIVILEGES;
    echo EXIT;
    pause
    exit /b 1
)

echo ✅ Database and user created!
echo.

REM Update .env file
echo Updating Iris .env file...
cd ..\iris

echo API_PORT=3001 > .env
echo OPERATION_WEBSOCKET_PORT=8080 >> .env
echo DATABASE_HOST=localhost >> .env
echo DATABASE_USERNAME=iris_user >> .env
echo DATABASE_PASSWORD=iris_password >> .env
echo DATABASE=iris >> .env
echo DATABASE_PORT=3306 >> .env

echo ✅ .env file updated!
echo.

REM Test connection
echo Testing MySQL connection...
mysql -u iris_user -piris_password -e "USE iris; SELECT 'Connection successful!' as status;" 2>nul

if errorlevel 1 (
    echo ❌ Connection test failed
    echo Please check your MySQL installation
    pause
    exit /b 1
)

echo ✅ MySQL connection successful!
echo.

echo ========================================
echo    MySQL Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Start Iris indexer: npm run indexer
echo 2. Start Iris API: npm run api  
echo 3. Restart DEXY backend: node iris-server.js
echo.
echo Your DEXY will now use real MySQL data!
echo.
pause 