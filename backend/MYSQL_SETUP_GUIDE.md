# MySQL Setup Guide for Iris

## Step 1: Install MySQL

### Option A: Download MySQL Installer (Recommended)
1. Go to: https://dev.mysql.com/downloads/installer/
2. Download "MySQL Installer for Windows"
3. Run the installer as Administrator
4. Choose "Developer Default" or "Server only"
5. Set root password (remember this!)
6. Complete installation

### Option B: Using Chocolatey (if you have it)
```powershell
choco install mysql
```

### Option C: Using Docker
```powershell
docker run --name mysql-iris -e MYSQL_ROOT_PASSWORD=yourpassword -e MYSQL_DATABASE=iris -p 3306:3306 -d mysql:8.0
```

## Step 2: Verify MySQL Installation
```powershell
mysql --version
```

## Step 3: Start MySQL Service
```powershell
# Start MySQL service
net start mysql80

# Or if using different version
net start mysql
```

## Step 4: Create Iris Database
```powershell
# Connect to MySQL as root
mysql -u root -p

# In MySQL prompt:
CREATE DATABASE iris;
CREATE USER 'iris_user'@'localhost' IDENTIFIED BY 'iris_password';
GRANT ALL PRIVILEGES ON iris.* TO 'iris_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## Step 5: Update Iris .env File
Edit `C:\Users\User\Documents\SNEKFN\iris\.env`:

```env
API_PORT=3001
OPERATION_WEBSOCKET_PORT=8080
DATABASE_HOST=localhost
DATABASE_USERNAME=iris_user
DATABASE_PASSWORD=iris_password
DATABASE=iris
DATABASE_PORT=3306
```

## Step 6: Test MySQL Connection
```powershell
# Test connection
mysql -u iris_user -p iris

# Should connect successfully
```

## Step 7: Start Iris with Database
```powershell
cd C:\Users\User\Documents\SNEKFN\iris

# Start Iris indexer (Terminal 1)
npm run indexer

# Start Iris API (Terminal 2)  
npm run api
```

## Troubleshooting

### If MySQL service won't start:
1. Open Services (services.msc)
2. Find "MySQL80" or "MySQL"
3. Right-click → Start
4. Set to "Automatic" startup

### If connection fails:
1. Check MySQL is running: `net start mysql80`
2. Verify credentials in .env file
3. Test connection: `mysql -u iris_user -p`

### If port 3306 is in use:
1. Check what's using it: `netstat -ano | findstr 3306`
2. Stop conflicting service or change port in .env

## Quick Setup Script
Create `setup-mysql.bat` in iris directory:

```batch
@echo off
echo Setting up MySQL for Iris...

REM Check if MySQL is installed
mysql --version >nul 2>&1
if errorlevel 1 (
    echo MySQL not found. Please install MySQL first.
    echo Download from: https://dev.mysql.com/downloads/installer/
    pause
    exit /b 1
)

echo MySQL found. Starting service...
net start mysql80

echo Creating Iris database...
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS iris; CREATE USER IF NOT EXISTS 'iris_user'@'localhost' IDENTIFIED BY 'iris_password'; GRANT ALL PRIVILEGES ON iris.* TO 'iris_user'@'localhost'; FLUSH PRIVILEGES;"

echo MySQL setup complete!
echo Now update your .env file and start Iris.
pause
```

## Next Steps
After MySQL setup:
1. Update Iris .env with database credentials
2. Start Iris indexer: `npm run indexer`
3. Start Iris API: `npm run api`
4. Restart DEXY backend: `node iris-server.js`

Your DEXY will then connect to real MySQL database with indexed blockchain data! 