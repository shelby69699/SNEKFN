// MINIMAL FALLBACK DATA - ONLY WHEN BACKEND IS DOWN!
// Backend data has PRIORITY - this is just to prevent blank page

export const DEXY_TOKENS = [
  { symbol: 'ADA', name: 'Cardano', icon: '🔷', price: 0.45, change24h: 2.5, volume24h: 1000000 },
  { symbol: 'SNEK', name: 'Snek', icon: '🐍', price: 0.00089, change24h: -1.2, volume24h: 50000 },
  { symbol: 'HOSK', name: 'Hosky Token', icon: '🐕', price: 0.000456, change24h: 5.7, volume24h: 75000 }
];

export const DEXY_TRADES = [
  {
    id: 'minimal_1',
    time: '1m ago',
    type: 'Buy',
    pair: 'ADA > SNEK',
    token1: { symbol: 'ADA', amount: '100', icon: '🔷' },
    token2: { symbol: 'SNEK', amount: '112,360', icon: '🐍' },
    inAmount: '100 ADA',
    outAmount: '112,360 SNEK',
    price: '0.00089 ADA',
    status: 'Success',
    dex: 'DexHunter',
    maker: 'addr...demo',
    timestamp: Date.now() - 60000,
    direction: 'up'
  }
];

export const DEX_STATS = {
  totalVolume24h: "Loading...",
  totalTrades24h: "Loading...", 
  avgTradeSize: "Loading...",
  activeTokens: "Loading..."
};