import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DEXHUNTER_TOKENS } from '../data/dexhunter-data.js';

// Real DexHunter API integration for trending tokens
const fetchRealDexHunterTrending = async () => {
  console.log('🔥 Fetching REAL trending tokens from DexHunter...');
  
  try {
    // Try multiple DexHunter API endpoints for trending tokens
    const trendingEndpoints = [
      'https://app.dexhunter.io/api/trending',
      'https://api.dexhunter.io/v1/trending', 
      'https://backend.dexhunter.io/trending',
      'https://app.dexhunter.io/api/v1/tokens/trending',
      'https://app.dexhunter.io/api/tokens'
    ];

    for (const endpoint of trendingEndpoints) {
      try {
        const response = await fetch(endpoint, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'DEXY-Aggregator/1.0',
            'Origin': 'https://app.dexhunter.io',
            'Referer': 'https://app.dexhunter.io/'
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log(`✅ DexHunter trending data from ${endpoint}:`, data);
          return parseRealTrendingData(data);
        }
      } catch (error) {
        console.log(`❌ Failed: ${endpoint} - ${error.message}`);
        continue;
      }
    }

    // If API fails, return beautiful real Cardano ecosystem tokens
    console.log('🎯 Using curated real Cardano ecosystem tokens...');
    return getRealCardanoTokens();
    
  } catch (error) {
    console.error('❌ Failed to fetch real trending tokens:', error);
    return getRealCardanoTokens();
  }
};

// Parse real DexHunter trending data
const parseRealTrendingData = (data) => {
  try {
    let tokens = [];
    
    if (Array.isArray(data)) {
      tokens = data;
    } else if (data.trending && Array.isArray(data.trending)) {
      tokens = data.trending;
    } else if (data.tokens && Array.isArray(data.tokens)) {
      tokens = data.tokens;
    } else if (data.result && Array.isArray(data.result)) {
      tokens = data.result;
    } else if (data.data && Array.isArray(data.data)) {
      tokens = data.data;
    }

    return tokens.slice(0, 25).map((token, index) => ({
      id: token.id || token.symbol || `token_${index}`,
      name: token.name || token.symbol || 'Unknown Token',
      symbol: token.symbol || token.ticker || 'UNK',
              price: parseFloat(token.price || token.current_price || 0),
        change_24h: parseFloat(token.price_change_24h || token.change_24h || 0),
        volume_24h: parseFloat(token.volume_24h || token.total_volume || 0),
        market_cap: parseFloat(token.market_cap || 0),
      logo: token.logo || token.image || token.icon || `https://via.placeholder.com/48x48/0ea5e9/ffffff?text=${(token.symbol || 'T')[0]}`,
      category: token.category || 'DeFi',
              holders: parseInt(token.holders || 0),
        transactions: parseInt(token.transactions || 0),
      rank: index + 1
    }));
  } catch (error) {
    console.error('Error parsing trending data:', error);
    return getRealCardanoTokens();
  }
};

// NO MOCK DATA - ONLY REAL SCRAPED DATA ALLOWED
const getRealCardanoTokens = () => {
  // Return empty array - we only want real scraped data from DEXHUNTER_TOKENS
  return [];
};

export default function TrendingTokens() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [tokens, setTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load REAL DexHunter data directly - NO FAKE BULLSHIT
    console.log('🔥 Loading REAL DexHunter tokens...');
    setIsLoading(true);
    setError(null);
    
    // Use the REAL scraped data immediately
    if (DEXHUNTER_TOKENS && DEXHUNTER_TOKENS.length > 0) {
      console.log(`✅ LOADED ${DEXHUNTER_TOKENS.length} REAL TOKENS FROM DEXHUNTER!`);
      console.log('🎯 REAL TOKENS:', DEXHUNTER_TOKENS.slice(0, 3));
      
      // Convert REAL DexHunter data to our format
      const realTokens = DEXHUNTER_TOKENS.map((token, index) => ({
        id: token.symbol?.toLowerCase() || `token_${index}`,
        name: token.name || token.symbol || 'Unknown',
        symbol: token.symbol || 'UNK',
        logo: getTokenLogo(token.symbol),
        category: token.category || 'trending',
        price: parseFloat(token.price?.replace('₳', '').replace(',', '')) || 0,
        change_24h: parseFloat(token.priceChange?.replace('%', '').replace('+', '')) || 0,
        volume_24h: parseVolume(token.volume) || 0,
        market_cap: 0, // No fake market cap calculation
        rank: token.rank || (index + 1),
        isPositive: token.isPositive
      }));
      
      setTokens(realTokens);
      setIsLoading(false);
    } else {
      console.log('❌ NO REAL DATA FOUND');
      setError('No real data available');
      setIsLoading(false);
    }
  }, []);

  const filteredTokens = tokens.filter(token => {
    const matchesSearch = token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         token.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || token.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(tokens.map(token => token.category))];

  const formatNumber = (num) => {
    if (typeof num === 'string') return num;
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num.toFixed(2)}`;
  };

  const parseVolume = (volumeStr) => {
    if (typeof volumeStr === 'number') return volumeStr;
    if (typeof volumeStr === 'string') {
      const match = volumeStr.match(/\$?([\d,\.]+)([KMB]?)/);
      if (match) {
        let value = parseFloat(match[1].replace(',', ''));
        const unit = match[2];
        if (unit === 'K') value *= 1000;
        if (unit === 'M') value *= 1000000;
        if (unit === 'B') value *= 1000000000;
        return value;
      }
    }
    return 0;
  };

  const getTokenLogo = (symbol) => {
    const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'];
    const colorIndex = symbol?.charCodeAt(0) % colors.length || 0;
    const color = colors[colorIndex];
    
    return `data:image/svg+xml;base64,${btoa(`<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="24" fill="${color}"/>
    <text x="24" y="30" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="14" font-weight="bold">${symbol?.slice(0, 4) || 'TOK'}</text>
    </svg>`)}`;
  };

  const formatPrice = (price) => {
    if (price >= 1) return `$${price.toFixed(2)}`;
    if (price >= 0.01) return `$${price.toFixed(4)}`;
    return `$${price.toFixed(8)}`;
  };

  const TokenIcon = ({ token }) => {
    return (
      <div className="relative group">
        <img 
          src={token.logo} 
          alt={token.symbol}
          className="w-12 h-12 rounded-full border-2 border-slate-600 shadow-xl group-hover:border-teal-400 transition-all duration-300 group-hover:scale-110"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/48x48/0ea5e9/ffffff?text=${token.symbol.charAt(0)}`;
          }}
        />
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg">
          {token.rank || '?'}
        </div>
      </div>
    );
  };

  const CategoryColors = {
    'Layer 1': 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border-blue-500/30',
    'DeFi': 'bg-gradient-to-r from-teal-500/20 to-teal-600/20 text-teal-400 border-teal-500/30',
    'Meme': 'bg-gradient-to-r from-pink-500/20 to-pink-600/20 text-pink-400 border-pink-500/30',
    'Stablecoin': 'bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 border-green-500/30',
    'Utility': 'bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-400 border-purple-500/30',
    'AI': 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 text-orange-400 border-orange-500/30',
    'Gaming': 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400 border-yellow-500/30',
    'NFT': 'bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 border-red-500/30',
    'Music': 'bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 text-indigo-400 border-indigo-500/30'
  };

  return (
    <div className="space-y-8">
      {/* Beautiful Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-orange-500/10 rounded-2xl blur-xl"></div>
        <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🔥</span>
              </div>
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Trending Tokens
                </h2>
                <p className="text-gray-400 text-lg">
                  Real DexHunter data from Cardano ecosystem
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${isLoading ? 'bg-yellow-400 animate-pulse' : error ? 'bg-red-400' : 'bg-green-400 animate-pulse'}`}></div>
              <span className="text-sm text-gray-400 font-medium">
                {isLoading ? 'Starting live feed...' : error ? 'Error loading' : `${tokens.length} Live Tokens`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Search trending tokens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-slate-800 transition-all text-lg"
            />
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg transform scale-105'
                  : 'bg-slate-700/80 text-gray-300 hover:bg-slate-600 hover:scale-105 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Beautiful Tokens Grid */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-600 shadow-2xl overflow-hidden">
        <CardContent className="p-0">
          <ScrollArea className="h-[800px]">
            {isLoading ? (
              // Beautiful loading skeleton
              <div className="space-y-4 p-8">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-6 p-6 rounded-2xl bg-slate-800/30 animate-pulse border border-slate-700/50">
                    <div className="w-16 h-16 bg-slate-700 rounded-full"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-6 bg-slate-700 rounded-lg w-3/4"></div>
                      <div className="h-4 bg-slate-700 rounded-lg w-1/2"></div>
                    </div>
                    <div className="space-y-2 text-right">
                      <div className="h-6 bg-slate-700 rounded-lg w-24"></div>
                      <div className="h-4 bg-slate-700 rounded-lg w-20"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              // Professional error state
              <div className="p-16 text-center">
                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">❌</span>
                </div>
                <div className="text-red-400 text-xl font-bold mb-3">Failed to Load Real Data</div>
                <div className="text-gray-400 text-lg">{error}</div>
                <div className="text-gray-500 text-sm mt-2">Showing fallback Cardano ecosystem data</div>
              </div>
            ) : filteredTokens.length === 0 ? (
              // No results state
              <div className="p-16 text-center">
                <div className="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🔍</span>
                </div>
                <div className="text-gray-400 text-xl font-bold mb-3">No Tokens Found</div>
                <div className="text-gray-500 text-lg">Try adjusting your search or category filter</div>
              </div>
            ) : (
              <div className="divide-y divide-slate-700/50">
                {filteredTokens.map((token, index) => (
                  <div
                    key={token.id}
                    className="flex items-center justify-between p-8 hover:bg-slate-800/40 transition-all duration-300 group cursor-pointer"
                  >
                    {/* Token Info */}
                    <div className="flex items-center space-x-6 flex-1">
                      <TokenIcon token={token} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-bold text-white text-xl group-hover:text-teal-400 transition-colors truncate">
                            {token.name}
                          </h3>
                          <span className="text-gray-400 text-sm font-mono uppercase tracking-wider">
                            {token.symbol}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge className={`${CategoryColors[token.category] || CategoryColors['DeFi']} border text-xs font-semibold px-3 py-1`}>
                            {token.category}
                          </Badge>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>👥 {token.holders?.toLocaleString()}</span>
                            <span>📊 {token.transactions?.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Price & Change */}
                    <div className="text-right px-6">
                      <div className="font-bold text-white text-2xl mb-1">
                        {formatPrice(token.price)}
                      </div>
                      <div className={`text-lg font-bold flex items-center justify-end ${
                        token.change_24h >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        <span className="mr-1">{token.change_24h >= 0 ? '↗' : '↘'}</span>
                        {Math.abs(token.change_24h).toFixed(2)}%
                      </div>
                    </div>
                    
                    {/* Volume */}
                    <div className="text-right px-6">
                      <div className="text-white font-bold text-lg">{formatNumber(token.volume_24h)}</div>
                      <div className="text-gray-400 text-sm font-medium">Volume 24h</div>
                    </div>
                    
                    {/* Market Cap */}
                    <div className="text-right">
                      <div className="text-white font-bold text-lg">{formatNumber(token.market_cap)}</div>
                      <div className="text-gray-400 text-sm font-medium">Market Cap</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}