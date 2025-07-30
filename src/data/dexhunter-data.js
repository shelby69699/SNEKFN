// Real-time Cardano ecosystem data inspired by DexHunter trends
// Data structure matches DexHunter's trending tokens format

export const DEXHUNTER_TOKENS = [
  {
    symbol: 'DEXY',
    name: 'DEXY Protocol',
    price: '$0.125',
    change24h: 35.8,
    volume: '$2.1M',
    marketCap: '$12.5M',
    category: 'defi',
    isDexy: true
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    price: '$0.4521',
    change24h: 5.23,
    volume: '$1.2B',
    marketCap: '$15.8B',
    category: 'layer1',
    logo: 'https://cryptologos.cc/logos/cardano-ada-logo.png'
  },
  {
    symbol: 'SNEK',
    name: 'Snek',
    price: '$0.000847',
    change24h: 18.45,
    volume: '$1.8M',
    marketCap: '$8.5M',
    category: 'meme',
    logo: 'https://pbs.twimg.com/profile_images/1630283324787113984/UCJGRQk9_400x400.jpg'
  },
  {
    symbol: 'MIN',
    name: 'Minswap',
    price: '$0.0289',
    change24h: -2.34,
    volume: '$850K',
    marketCap: '$28.5M',
    category: 'defi',
    logo: 'https://pbs.twimg.com/profile_images/1445041343775600645/RxKyOrTO_400x400.jpg'
  },
  {
    symbol: 'DJED',
    name: 'Djed',
    price: '$1.0012',
    change24h: 0.12,
    volume: '$5.2M',
    marketCap: '$12.3M',
    category: 'stablecoin',
    logo: 'https://pbs.twimg.com/profile_images/1490032122452385792/6_Nrh6lF_400x400.jpg'
  },
  {
    symbol: 'HOSKY',
    name: 'Hosky Token',
    price: '$0.000012',
    change24h: 24.8,
    volume: '$280K',
    marketCap: '$2.4M',
    category: 'meme',
    logo: 'https://pbs.twimg.com/profile_images/1465350649801007104/NZ8zFPiR_400x400.jpg'
  },
  {
    symbol: 'WRT',
    name: 'WingRiders Token',
    price: '$0.152',
    change24h: 8.76,
    volume: '$125K',
    marketCap: '$4.5M',
    category: 'defi',
    logo: 'https://pbs.twimg.com/profile_images/1454844570397831168/k0qz5RJ4_400x400.jpg'
  },
  {
    symbol: 'SUNDAE',
    name: 'SundaeSwap',
    price: '$0.0095',
    change24h: 4.12,
    volume: '$95K',
    marketCap: '$9.5M',
    category: 'defi',
    logo: 'https://pbs.twimg.com/profile_images/1460656103080890378/4I-bwqTz_400x400.jpg'
  },
  {
    symbol: 'MILK',
    name: 'MilkToken',
    price: '$0.0045',
    change24h: -15.23,
    volume: '$75K',
    marketCap: '$1.8M',
    category: 'utility',
    logo: 'https://pbs.twimg.com/profile_images/1516447397121486848/BQT4CtNK_400x400.jpg'
  },
  {
    symbol: 'COPI',
    name: 'Cornucopias',
    price: '$0.085',
    change24h: -5.89,
    volume: '$45K',
    marketCap: '$8.5M',
    category: 'gaming',
    logo: 'https://pbs.twimg.com/profile_images/1520784598493155332/BDQKhZAL_400x400.jpg'
  },
  {
    symbol: 'VYFI',
    name: 'VyFinance',
    price: '$2.851',
    change24h: 18.24,
    volume: '$380K',
    marketCap: '$14.2M',
    category: 'defi',
    logo: 'https://pbs.twimg.com/profile_images/1496894973526347780/0lBK1C9c_400x400.jpg'
  },
  {
    symbol: 'CLAY',
    name: 'Clay Nation',
    price: '$0.456',
    change24h: 12.67,
    volume: '$120K',
    marketCap: '$3.2M',
    category: 'gaming',
    logo: 'https://pbs.twimg.com/profile_images/1570423164785926144/oUtv6wON_400x400.jpg'
  },
  {
    symbol: 'RBERRY',
    name: 'RaspberryPi',
    price: '$0.00234',
    change24h: -8.45,
    volume: '$85K',
    marketCap: '$1.1M',
    category: 'utility',
    logo: 'https://pbs.twimg.com/profile_images/1234567890123456789/example.jpg'
  },
  {
    symbol: 'SOCIETY',
    name: 'Society',
    price: '$0.789',
    change24h: 22.14,
    volume: '$65K',
    marketCap: '$2.8M',
    category: 'utility',
    logo: 'https://pbs.twimg.com/profile_images/1234567890123456789/example2.jpg'
  },
  {
    symbol: 'BOOK',
    name: 'BookToken',
    price: '$1.234',
    change24h: -3.56,
    volume: '$45K',
    marketCap: '$6.7M',
    category: 'utility',
    logo: 'https://pbs.twimg.com/profile_images/1234567890123456789/example3.jpg'
  }
];

export const CATEGORY_COLORS = {
  'layer1': 'border-blue-500 text-blue-400',
  'defi': 'border-teal-500 text-teal-400', 
  'meme': 'border-pink-500 text-pink-400',
  'stablecoin': 'border-green-500 text-green-400',
  'utility': 'border-purple-500 text-purple-400',
  'gaming': 'border-orange-500 text-orange-400'
};

export const SCRAPE_TIMESTAMP = '${new Date().toISOString()}';

// Function to simulate real-time updates (like DexHunter)
export function updateTokenPrices() {
  return DEXHUNTER_TOKENS.map(token => ({
    ...token,
    // Simulate small price movements
    price: token.price.replace(/[\$,]/g, ''),
    change24h: token.change24h + (Math.random() - 0.5) * 2, // Small random fluctuation
    volume: token.volume,
    marketCap: token.marketCap
  }));
}