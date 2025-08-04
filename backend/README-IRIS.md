# DEXY with Iris Cardano DEX Indexer - REAL DATA ONLY

This backend integrates with the [Iris Cardano DEX Indexer](https://github.com/Flux-Point-Studios/iris) to provide **REAL-TIME DEX DATA ONLY** from actual Cardano blockchain trades using the official Iris API.

## 🚨 REAL DATA ONLY - NO FALLBACK BULLSHIT

This backend will **FAIL** if Iris is not running and indexing data. No fake data generation.

## What is Iris?

Iris is a Cardano DEX data aggregator that indexes all DEX-related data including:
- Swaps
- Deposits
- Withdraws
- Zaps
- Order cancellations
- Liquidity Pools
- Liquidity Pool states
- Pooled assets
- Order books
- Order book orders & cancellations

## Quick Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Set up Iris (REQUIRED)
```bash
# Clone Iris repository
git clone https://github.com/Flux-Point-Studios/iris.git
cd iris

# Install dependencies
npm install

# Build Iris
npm run build

# Copy environment file
cp .env.example .env
```

### 3. Configure Environment

Edit the Iris `.env` file:
```env
# MySQL Database
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=iris
MYSQL_PORT=3306

# Ogmios (Cardano node connection)
OGMIOS_HOST=localhost
OGMIOS_PORT=1337

# Iris API
API_PORT=3001
OPERATION_WEBSOCKET_PORT=8080
```

### 4. Set up MySQL Database
```sql
CREATE DATABASE iris;
```

### 5. Set up Ogmios
Install and configure Ogmios to connect to a Cardano node. See [Ogmios documentation](https://ogmios.dev/).

### 6. Start Iris Services (REQUIRED)
```bash
# Terminal 1: Start Iris indexer
npm run indexer

# Terminal 2: Start Iris API
npm run api
```

### 7. Start DEXY Backend
```bash
# In the backend directory
npm start
```

## Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Iris Configuration
IRIS_API_URL=http://localhost:3001
IRIS_WS_URL=ws://localhost:8080

# MySQL Database Configuration
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=iris
MYSQL_PORT=3306

# Server Configuration
PORT=9999
NODE_ENV=development
```

## Iris API Integration

The backend uses the official Iris API endpoints:

### Liquidity Pools
- `GET /liquidity-pools` - Get all liquidity pools
- `GET /liquidity-pools/:identifier` - Get specific pool
- `GET /liquidity-pools/:identifier/swaps` - Get pool swaps

### Assets
- `GET /assets` - Get all assets
- `GET /assets/:asset` - Get specific asset
- `GET /assets/:asset/price` - Get asset price

### Swap Orders
- `POST /orders/swaps` - Get swap orders
- `GET /liquidity-pools/:identifier/swaps` - Get pool swaps

## API Endpoints

### Health Check
```
GET /api/health
```
Returns backend status and Iris connection information.

### Get All Data
```
GET /api/data
```
Returns trades, tokens, and stats in a single response.

### Get Trades
```
GET /api/trades
```
Returns latest DEX trades from Iris.

### Get Tokens
```
GET /api/tokens
```
Returns trending tokens with price data.

### Get Stats
```
GET /api/stats
```
Returns DEX statistics.

### Manual Update
```
POST /api/trigger-update
```
Manually trigger a data update from Iris.

## Data Sources

The backend **ONLY** uses real data:

1. **Iris API** - Official Iris REST API endpoints
2. **Iris Database** - Direct MySQL connection to Iris database

**NO FALLBACK DATA GENERATION**

## Real-time Updates

The backend connects to Iris WebSocket for real-time trade updates:
- Automatically receives new trades as they happen
- Updates the frontend in real-time
- Maintains connection with automatic reconnection

## Data Flow

1. **Fetch Liquidity Pools** - Get top pools from Iris API
2. **Fetch Swaps** - Get recent swaps from each pool
3. **Convert Data** - Transform Iris format to DEXY format
4. **Serve Frontend** - Provide data to Vercel frontend

## Troubleshooting

### Check Iris Status
```bash
node check-iris.js
```

### Test API Endpoints
```bash
# Test Iris API directly
curl http://localhost:3001/liquidity-pools?limit=5

# Test DEXY backend
curl http://localhost:9999/api/health
```

### Common Issues

1. **Iris not running**
   - Make sure Iris indexer and API are running
   - Check ports 3001 (API) and 8080 (WebSocket)
   - **Backend will fail without Iris**

2. **Database connection failed**
   - Verify MySQL is running
   - Check database credentials in `.env`
   - Ensure Iris database exists
   - **Backend will fail without database**

3. **Ogmios connection failed**
   - Verify Ogmios is running
   - Check Cardano node connection
   - Ensure proper network configuration
   - **Iris will fail without Ogmios**

4. **No real data**
   - Check if Iris is indexing transactions
   - Verify Cardano node is synced
   - Check Iris logs for errors
   - **Backend will fail without real data**

5. **API errors**
   - Verify Iris API is running on port 3001
   - Check Iris API logs for errors
   - Ensure Iris has indexed some data
   - **Backend will fail without API**

## Development

### Running in Development Mode
```bash
npm run dev
```

### Running with Real Data Only
```bash
npm start
```

### Testing API Endpoints
```bash
# Health check
curl http://localhost:9999/api/health

# Get all data
curl http://localhost:9999/api/data

# Manual update
curl -X POST http://localhost:9999/api/trigger-update
```

## Production Deployment

For production deployment on Vercel:

1. Set up Iris on a separate server
2. Update environment variables with production URLs
3. Deploy backend to Vercel
4. Configure CORS for production domains

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   DEXY Backend  │    │   Iris API      │
│   (Vercel)      │◄──►│   (Node.js)     │◄──►│   (TypeScript)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │                        │
                              ▼                        ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │   MySQL DB      │    │   Ogmios        │
                       │   (Iris Data)   │    │   (Cardano)     │
                       └─────────────────┘    └─────────────────┘
```

## Data Flow

1. **Iris Indexer** monitors Cardano blockchain via Ogmios
2. **Iris API** provides REST endpoints for data access
3. **DEXY Backend** fetches data from Iris API and serves to frontend
4. **Frontend** displays real-time DEX data to users

## Supported DEXs

Iris supports multiple Cardano DEXs including:
- Minswap
- SundaeSwap
- WingRiders
- MuesliSwap
- And more...

## API Response Examples

### Liquidity Pool Response
```json
{
  "data": [
    {
      "tokenA": "",
      "tokenB": {
        "policyId": "533bb94a8850ee3ccbe483106489399112b74c905342cb1792a797a0",
        "nameHex": "494e4459",
        "ticker": "INDY",
        "name": "Indigo DAO Token"
      },
      "dex": "Minswap",
      "identifier": "lovelace.e4214b7cce62ac6fbba385d164df48e157eae5863521b4b67ca71d8680de0bde4e25229cb5443dfbb93a8a14beb6aa442d587a484800301d02cca796"
    }
  ]
}
```

### Swap Order Response
```json
{
  "data": [
    {
      "swapInToken": {
        "policyId": "",
        "nameHex": "",
        "ticker": "ADA",
        "name": "Cardano"
      },
      "swapOutToken": {
        "policyId": "533bb94a8850ee3ccbe483106489399112b74c905342cb1792a797a0",
        "nameHex": "494e4459",
        "ticker": "INDY",
        "name": "Indigo DAO Token"
      },
      "swapInAmount": 1000000000,
      "minReceive": 100000000,
      "senderPubKeyHash": "addr1...",
      "slot": 104572301,
      "txHash": "9d034453a9e21fcb6e14dd7c50587e43d1b5220bc2ad081cc6409b05740507e8"
    }
  ]
}
```

## Contributing

1. Fork the repository
2. Set up Iris locally
3. Make your changes
4. Test with real DEX data
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For Iris-specific issues, see the [Iris repository](https://github.com/Flux-Point-Studios/iris).

For DEXY issues, create an issue in this repository. 