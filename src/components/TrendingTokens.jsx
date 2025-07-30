import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CATEGORY_COLORS } from '../data/dexhunter-data';
import realTimeData from '../utils/realTimeData';

// REAL-TIME Cardano token data from multiple APIs - NO MOCK BULLSHIT!

export default function TrendingTokens() {
  const [tokens, setTokens] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    console.log('🔥 DEXY: Starting REAL-TIME Cardano data feed...');
    setIsLoading(true);

    // Subscribe to real-time data updates
    const unsubscribe = realTimeData.subscribe((newTokens) => {
      console.log(`📊 LIVE UPDATE: ${newTokens.length} tokens received`);
      setTokens(newTokens);
      setIsLoading(false);
      setLastUpdate(new Date());
    });

    // Start the real-time data feed (updates every 10 seconds)
    realTimeData.start(10000);

    // Cleanup on unmount
    return () => {
      unsubscribe();
      realTimeData.stop();
    };
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
          <h2 className="text-2xl font-bold text-white">
            Trending Tokens
          </h2>
          <p className="text-gray-400">
            Top performing tokens across Cardano DEXes
          </p>
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
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 10 }).map((_, index) => (
                  <tr key={index} className="border-b border-slate-800">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-slate-700 rounded-lg animate-pulse"></div>
                        <div className="space-y-1">
                          <div className="w-16 h-4 bg-slate-700 rounded animate-pulse"></div>
                          <div className="w-24 h-3 bg-slate-700 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4"><div className="w-20 h-4 bg-slate-700 rounded animate-pulse"></div></td>
                    <td className="p-4"><div className="w-16 h-4 bg-slate-700 rounded animate-pulse"></div></td>
                    <td className="p-4"><div className="w-20 h-4 bg-slate-700 rounded animate-pulse"></div></td>
                    <td className="p-4"><div className="w-20 h-4 bg-slate-700 rounded animate-pulse"></div></td>
                    <td className="p-4"><div className="w-16 h-6 bg-slate-700 rounded animate-pulse"></div></td>
                  </tr>
                ))
              ) : filteredTokens.map((token, index) => (
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
                            // Your ACTUAL DEXY logo - cubic framework
                            <div className="relative w-8 h-8">
                              <div className="absolute inset-0 border-2 border-teal-400 rounded-lg transform rotate-12">
                                <div className="absolute -inset-0.5">
                                  <div className="absolute top-0 left-1/4 w-1/2 h-0.5 bg-teal-400"></div>
                                  <div className="absolute left-0 top-1/4 w-0.5 h-1/2 bg-teal-400"></div>
                                </div>
                              </div>
                              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
                              <div className="absolute top-1/4 -right-1 w-1.5 h-1.5 bg-white rounded-full"></div>
                              <div className="absolute inset-2 border border-teal-500 rounded-sm bg-slate-800/60">
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-br from-orange-400 to-orange-600 rounded-sm"></div>
                              </div>
                            </div>
                          ) : (
                            // Real token logos
                            <div className="w-8 h-8 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                              <img 
                                src={token.logo} 
                                alt={token.symbol}
                                className="w-8 h-8 object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                              <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg hidden items-center justify-center border border-slate-500">
                                <span className="text-xs font-bold text-white">{token.symbol.slice(0, 2)}</span>
                              </div>
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-white">{token.symbol}</div>
                            <div className="text-sm text-gray-400">{token.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-white">
                        {typeof token.price === 'string' ? token.price : `$${token.price}`}
                      </td>
                      <td className="p-4">
                        <span className={`font-medium ${
                          token.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                        </span>
                      </td>
                      <td className="p-4 text-gray-300">
                        {token.volume}
                      </td>
                      <td className="p-4 text-gray-300">
                        {token.marketCap}
                      </td>
                      <td className="p-4">
                        <Badge 
                          variant="outline" 
                          className={`text-xs px-2 py-1 ${CATEGORY_COLORS[token.category] || 'border-gray-500 text-gray-400'}`}
                        >
                          {token.category.toUpperCase()}
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