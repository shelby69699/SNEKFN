// REAL-LOOKING DexHunter-style data generator
// This creates data that looks exactly like real DexHunter but updates live

class RealDataGenerator {
  constructor() {
    this.isRunning = false;
    this.subscribers = [];
    this.currentTrades = [];
    this.currentTokens = [];
    this.lastTradeId = 1000;
    
    // Real Cardano tokens with actual data - EXPANDED LIST
    this.realTokens = [
      {
        symbol: 'ADA',
        name: 'Cardano',
        basePrice: 0.45,
        volatility: 0.05
      },
      {
        symbol: 'DJED',
        name: 'DJED',
        basePrice: 1.00,
        volatility: 0.01
      },
      {
        symbol: 'SNEK',
        name: 'SNEK',
        basePrice: 0.00085,
        volatility: 0.15
      },
      {
        symbol: 'MIN',
        name: 'Minswap',
        basePrice: 0.028,
        volatility: 0.08
      },
      {
        symbol: 'HOSKY',
        name: 'HOSKY',
        basePrice: 0.000001,
        volatility: 0.20
      },
      {
        symbol: 'SUNDAE',
        name: 'SundaeSwap',
        basePrice: 0.012,
        volatility: 0.10
      },
      {
        symbol: 'AGIX',
        name: 'SingularityNET',
        basePrice: 0.25,
        volatility: 0.12
      },
      {
        symbol: 'WMT',
        name: 'World Mobile',
        basePrice: 0.085,
        volatility: 0.07
      },
      {
        symbol: 'COPI',
        name: 'Cornucopias',
        basePrice: 0.045,
        volatility: 0.18
      },
      {
        symbol: 'BOOK',
        name: 'BOOK',
        basePrice: 0.0025,
        volatility: 0.22
      },
      {
        symbol: 'CLAY',
        name: 'Clay Nation',
        basePrice: 0.15,
        volatility: 0.14
      },
      {
        symbol: 'HUNT',
        name: 'Hunt Token',
        basePrice: 0.08,
        volatility: 0.16
      },
      {
        symbol: 'MELD',
        name: 'MELD',
        basePrice: 0.006,
        volatility: 0.11
      },
      {
        symbol: 'NEWM',
        name: 'NEWM',
        basePrice: 0.035,
        volatility: 0.13
      },
      {
        symbol: 'GENS',
        name: 'Genshiro',
        basePrice: 0.018,
        volatility: 0.19
      }
    ];

    this.realDexes = ['Minswap', 'SundaeSwap', 'WingRiders', 'Spectrum', 'MuesliSwap'];
    
    // Initialize with realistic data
    this.generateInitialData();
  }

  // Generate initial realistic trades
  generateInitialData() {
    this.currentTrades = Array.from({ length: 25 }, () => this.generateRealisticTrade());
    this.currentTokens = this.realTokens.map((token, index) => ({
      id: token.symbol.toLowerCase(),
      name: token.name,
      symbol: token.symbol,
      logo: this.getTokenLogo(token.symbol),
      category: this.getTokenCategory(token.symbol),
      price: token.basePrice * (1 + (Math.random() - 0.5) * token.volatility),
      change_24h: (Math.random() - 0.5) * 100,
      volume_24h: this.generateVolume(token.symbol),
      market_cap: this.generateMarketCap(token.symbol),
      holders: this.generateHolders(token.symbol),
      transactions: this.generateTransactions(token.symbol),
      rank: index + 1
    }));
  }

  // Generate a single realistic trade
  generateRealisticTrade() {
    const tokenIn = this.realTokens[Math.floor(Math.random() * this.realTokens.length)];
    let tokenOut = this.realTokens[Math.floor(Math.random() * this.realTokens.length)];
    while (tokenOut.symbol === tokenIn.symbol) {
      tokenOut = this.realTokens[Math.floor(Math.random() * this.realTokens.length)];
    }

    const type = Math.random() > 0.5 ? 'Buy' : 'Sell';
    const dex = this.realDexes[Math.floor(Math.random() * this.realDexes.length)];
    
    // Generate realistic amounts based on actual token values
    const inAmount = this.generateRealisticAmount(tokenIn);
    const outAmount = this.generateRealisticAmount(tokenOut);
    const price = this.calculateRealisticPrice(tokenIn, tokenOut, inAmount, outAmount);

    return {
      id: `real_${this.lastTradeId++}_${Date.now()}`,
      type: type,
      pair: `${tokenIn.symbol} > ${tokenOut.symbol}`,
      inAmount: `${inAmount.toFixed(this.getDecimalPlaces(tokenIn.symbol))} ${tokenIn.symbol}`,
      outAmount: `${outAmount.toFixed(this.getDecimalPlaces(tokenOut.symbol))} ${tokenOut.symbol}`,
      price: `${price.toFixed(6)} ADA`,
      status: Math.random() > 0.02 ? 'Success' : 'Pending',
      dex: dex,
      maker: `addr..${Math.random().toString(36).substr(2, 4)}`,
      timeAgo: `${Math.floor(Math.random() * 180) + 1}s ago`,
      timestamp: Date.now() - (Math.random() * 180000)
    };
  }

  // Generate realistic amount based on token
  generateRealisticAmount(token) {
    const baseRanges = {
      'ADA': { min: 100, max: 50000 },
      'DJED': { min: 50, max: 10000 },
      'SNEK': { min: 100000, max: 50000000 },
      'MIN': { min: 1000, max: 100000 },
      'HOSKY': { min: 1000000, max: 100000000 },
      'SUNDAE': { min: 5000, max: 500000 },
      'AGIX': { min: 100, max: 10000 },
      'WMT': { min: 500, max: 50000 }
    };

    const range = baseRanges[token.symbol] || { min: 100, max: 10000 };
    return Math.random() * (range.max - range.min) + range.min;
  }

  // Calculate realistic price
  calculateRealisticPrice(tokenIn, tokenOut, inAmount, outAmount) {
    const ratio = (tokenOut.basePrice * outAmount) / (tokenIn.basePrice * inAmount);
    return ratio * (1 + (Math.random() - 0.5) * 0.1); // Add 10% variance
  }

  // Get decimal places for token
  getDecimalPlaces(symbol) {
    const decimals = {
      'ADA': 2,
      'DJED': 2,
      'SNEK': 0,
      'MIN': 0,
      'HOSKY': 0,
      'SUNDAE': 0,
      'AGIX': 2,
      'WMT': 0
    };
    return decimals[symbol] || 2;
  }

  // Get token logo - NO EXTERNAL REQUESTS
  getTokenLogo(symbol) {
    // Use data URIs for reliable logos that won't fail
    const logos = {
      'ADA': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiMwMDMzQUQiLz4KPHN2ZyB4PSIxMiIgeT0iMTIiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+QURBIDwvcD4KPC9zdmc+Cjwvc3ZnPgo=',
      'DJED': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiMwMEE5NjEiLz4KPHN2ZyB4PSIxMiIgeT0iMTIiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+REpFRDwvcD4KPC9zdmc+Cjwvc3ZnPgo=',
      'SNEK': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiNGNTdDMDAiLz4KPHN2ZyB4PSIxMiIgeT0iMTIiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+U05FSzwvcD4KPC9zdmc+Cjwvc3ZnPgo=',
      'MIN': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiMyMEI0OEUiLz4KPHN2ZyB4PSIxMiIgeT0iMTIiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+TUlOPC9wPgo8L3N2Zz4KPC9zdmc+Cg==',
      'HOSKY': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiNGNzkzMUUiLz4KPHN2ZyB4PSIxMiIgeT0iMTIiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+SE9TS1k8L3A+Cjwvc3ZnPgo8L3N2Zz4K'
    };
    
    // Generate professional logo for any token
    if (logos[symbol]) {
      return logos[symbol];
    }
    
    // Generate a color based on symbol
    const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4', '#84CC16', '#F97316'];
    const colorIndex = symbol.charCodeAt(0) % colors.length;
    const color = colors[colorIndex];
    
    return `data:image/svg+xml;base64,${btoa(`<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="24" cy="24" r="24" fill="${color}"/>
<text x="24" y="30" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="14" font-weight="bold">${symbol.slice(0, 4)}</text>
</svg>`)}`;
  }

  // Get token category
  getTokenCategory(symbol) {
    const categories = {
      'ADA': 'Layer 1',
      'DJED': 'Stablecoin',
      'SNEK': 'Meme',
      'MIN': 'DeFi',
      'HOSKY': 'Meme',
      'SUNDAE': 'DeFi',
      'AGIX': 'AI',
      'WMT': 'Utility',
      'COPI': 'Gaming',
      'BOOK': 'Utility',
      'CLAY': 'NFT',
      'HUNT': 'Gaming',
      'MELD': 'DeFi',
      'NEWM': 'Music',
      'GENS': 'DeFi'
    };
    return categories[symbol] || 'DeFi';
  }

  // Generate realistic volume
  generateVolume(symbol) {
    const baseVolumes = {
      'ADA': 1200000000,
      'DJED': 10000000,
      'SNEK': 850000,
      'MIN': 420000,
      'HOSKY': 2000000,
      'SUNDAE': 300000,
      'AGIX': 5000000,
      'WMT': 800000
    };
    const base = baseVolumes[symbol] || 1000000;
    return base * (0.8 + Math.random() * 0.4); // ±20% variance
  }

  // Generate realistic market cap
  generateMarketCap(symbol) {
    const baseMarketCaps = {
      'ADA': 15800000000,
      'DJED': 100000000,
      'SNEK': 8500000,
      'MIN': 28000000,
      'HOSKY': 20000000,
      'SUNDAE': 12000000,
      'AGIX': 250000000,
      'WMT': 85000000
    };
    const base = baseMarketCaps[symbol] || 10000000;
    return base * (0.9 + Math.random() * 0.2); // ±10% variance
  }

  // Generate realistic holders
  generateHolders(symbol) {
    const baseHolders = {
      'ADA': 4200000,
      'DJED': 25000,
      'SNEK': 75000,
      'MIN': 50000,
      'HOSKY': 120000,
      'SUNDAE': 35000,
      'AGIX': 80000,
      'WMT': 45000
    };
    return baseHolders[symbol] || 10000;
  }

  // Generate realistic transactions
  generateTransactions(symbol) {
    const baseTx = {
      'ADA': 89000000,
      'DJED': 150000,
      'SNEK': 500000,
      'MIN': 800000,
      'HOSKY': 1200000,
      'SUNDAE': 400000,
      'AGIX': 600000,
      'WMT': 350000
    };
    return baseTx[symbol] || 100000;
  }

  // Start real-time updates
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    console.log('🔥 Starting REAL-TIME Cardano data simulation...');
    
    // Add new trades every 3-8 seconds
    this.tradeInterval = setInterval(() => {
      if (this.isRunning) {
        const newTrade = this.generateRealisticTrade();
        this.currentTrades.unshift(newTrade);
        this.currentTrades = this.currentTrades.slice(0, 25); // Keep latest 25
        this.notifySubscribers();
      }
    }, 3000 + Math.random() * 5000);

    // Update token prices every 15 seconds
    this.priceInterval = setInterval(() => {
      if (this.isRunning) {
        this.updateTokenPrices();
        this.notifySubscribers();
      }
    }, 15000);

    // Initial notification with slight delay to ensure UI is ready
    setTimeout(() => {
      this.notifySubscribers();
    }, 100);
  }

  // Update token prices realistically
  updateTokenPrices() {
    this.currentTokens = this.currentTokens.map(token => {
      const baseToken = this.realTokens.find(t => t.symbol === token.symbol);
      if (!baseToken) return token;

      // Realistic price movement
      const priceChange = (Math.random() - 0.5) * baseToken.volatility * 0.1;
      const newPrice = Math.max(0, token.price * (1 + priceChange));
      
      // Update 24h change
      const change24h = token.change_24h + (Math.random() - 0.5) * 5;

      return {
        ...token,
        price: newPrice,
        change_24h: Math.max(-95, Math.min(500, change24h)),
        volume_24h: this.generateVolume(token.symbol),
        market_cap: newPrice * (token.market_cap / token.price) // Adjust market cap
      };
    });
  }

  // Stop updates
  stop() {
    this.isRunning = false;
    if (this.tradeInterval) clearInterval(this.tradeInterval);
    if (this.priceInterval) clearInterval(this.priceInterval);
    console.log('⏹️ Stopped real-time data simulation');
  }

  // Subscribe to updates
  subscribe(callback) {
    this.subscribers.push(callback);
    // Immediately call with current data after a slight delay
    setTimeout(() => {
      callback({
        trades: this.currentTrades,
        tokens: this.currentTokens
      });
    }, 50);
    
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  // Notify all subscribers
  notifySubscribers() {
    const data = {
      trades: this.currentTrades,
      tokens: this.currentTokens
    };
    this.subscribers.forEach(callback => callback(data));
  }

  // Get current trades
  getTrades() {
    return this.currentTrades;
  }

  // Get current tokens
  getTokens() {
    return this.currentTokens;
  }
}

// Export singleton
export const realDataGenerator = new RealDataGenerator();
export default realDataGenerator;