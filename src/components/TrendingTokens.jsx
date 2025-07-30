import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { faker } from '@faker-js/faker';

// DEXY ecosystem tokens and metrics - your professional platform
const mockTokens = [
  { symbol: "DEXY", name: "DEXY Protocol", category: "defi" },
  { symbol: "ADA", name: "Cardano", category: "native" },
  { symbol: "DJED", name: "Djed Stablecoin", category: "stable" },
  { symbol: "IUSD", name: "Indigo USD", category: "stable" },
  { symbol: "MIN", name: "Minswap", category: "defi" },
  { symbol: "WRT", name: "WingRiders", category: "defi" },
  { symbol: "SUNDAE", name: "SundaeSwap", category: "defi" },
  { symbol: "VYFI", name: "VyFinance", category: "defi" },
  { symbol: "AGIX", name: "SingularityNET", category: "ai" },
  { symbol: "COPI", name: "Cornucopias", category: "gaming" }
];

const generateTrendingToken = (tokenData) => {
  const changePercent = faker.datatype.number({ min: -25, max: 150, precision: 0.01 });
  const volume24h = faker.datatype.number({ min: 100000, max: 5000000 });
  const price = faker.finance.amount(0.001, 2, 6);
  const marketCap = faker.datatype.number({ min: 1000000, max: 100000000 });
  
  return {
    ...tokenData,
    price: `$${price}`,
    change24h: changePercent,
    volume24h: `$${(volume24h / 1000000).toFixed(2)}M`,
    marketCap: `$${(marketCap / 1000000).toFixed(1)}M`,
    // Use DEXY geometric icon instead of random avatars
    isDexy: tokenData.symbol === 'DEXY'
  };
};

export default function TrendingTokens() {
  const [tokens, setTokens] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const trendingTokens = mockTokens.map(generateTrendingToken);
    setTokens(trendingTokens);
    
    const interval = setInterval(() => {
      setTokens(prev => prev.map(token => ({
        ...token,
        change24h: faker.datatype.number({ min: -25, max: 150, precision: 0.01 })
      })));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const filteredTokens = tokens.filter(token => {
    const matchesFilter = filter === 'all' || token.category === filter;
    const matchesSearch = token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         token.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatNumber = (num) => {
    if (typeof num === 'string') return num;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Trending</h2>
          <p className="text-muted-foreground">Discover trending tokens on Cardano</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search tokens..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'defi', 'stable', 'native', 'ai', 'gaming'].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-all border ${
              filter === category
                ? 'bg-gradient-to-r from-teal-600 to-orange-600 text-white shadow-lg border-teal-400'
                : 'bg-slate-800/50 border-slate-700 text-gray-300 hover:bg-slate-700 hover:text-white hover:border-teal-500/50'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Trending Tokens Table */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardContent className="p-0">
          <ScrollArea className="h-[600px]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-700">
                  <tr className="text-left">
                    <th className="p-4 text-sm font-medium text-gray-400">#</th>
                    <th className="p-4 text-sm font-medium text-gray-400">Token</th>
                    <th className="p-4 text-sm font-medium text-gray-400">Price</th>
                    <th className="p-4 text-sm font-medium text-gray-400">24h Change</th>
                    <th className="p-4 text-sm font-medium text-gray-400">24h Volume</th>
                    <th className="p-4 text-sm font-medium text-gray-400">Market Cap</th>
                    <th className="p-4 text-sm font-medium text-gray-400">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTokens.map((token, index) => (
                    <tr 
                      key={token.symbol} 
                      className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors cursor-pointer"
                    >
                      <td className="p-4 text-gray-400 text-sm">
                        {index + 1}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          {token.isDexy ? (
                            // Special DEXY logo for DEXY token
                            <div className="relative w-8 h-8">
                              <div className="absolute inset-0 border-2 border-teal-400 rounded-lg rotate-12"></div>
                              <div className="absolute inset-1 border border-teal-500 rounded-md rotate-6">
                                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 rounded-sm"></div>
                              </div>
                            </div>
                          ) : (
                            // Professional geometric icons for other tokens
                            <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg flex items-center justify-center border border-slate-500">
                              <span className="text-xs font-bold text-white">{token.symbol.slice(0, 2)}</span>
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-white">{token.symbol}</div>
                            <div className="text-sm text-gray-400">{token.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-white">
                        {token.price}
                      </td>
                      <td className="p-4">
                        <span className={`font-medium ${
                          token.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                        </span>
                      </td>
                      <td className="p-4 text-gray-300">
                        {token.volume24h}
                      </td>
                      <td className="p-4 text-gray-300">
                        {token.marketCap}
                      </td>
                      <td className="p-4">
                        <Badge 
                          variant="outline" 
                          className={`
                            ${token.category === 'defi' ? 'border-teal-500 text-teal-400' : ''}
                            ${token.category === 'stable' ? 'border-green-500 text-green-400' : ''}
                            ${token.category === 'native' ? 'border-blue-500 text-blue-400' : ''}
                            ${token.category === 'ai' ? 'border-purple-500 text-purple-400' : ''}
                            ${token.category === 'gaming' ? 'border-orange-500 text-orange-400' : ''}
                          `}
                        >
                          {token.category}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}