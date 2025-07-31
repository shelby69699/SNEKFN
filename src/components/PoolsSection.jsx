import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const mockPoolTokens = [
  { tokenA: "ADA", tokenB: "DJED" },
  { tokenA: "ADA", tokenB: "SNEK" },
  { tokenA: "ADA", tokenB: "HOSKY" },
  { tokenA: "DJED", tokenB: "SNEK" },
  { tokenA: "ADA", tokenB: "MIN" },
  { tokenA: "ADA", tokenB: "WRT" },
  { tokenA: "SNEK", tokenB: "HOSKY" },
  { tokenA: "ADA", tokenB: "SUNDAE" }
];

const generatePoolData = (tokens) => {
      const tvl = Math.floor(Math.random() * 10000000 + 100000);
    const volume24h = Math.floor(Math.random() * 2000000 + 10000);
    const apy = (Math.random() * 145 + 5).toFixed(2);
  const fees24h = volume24h * 0.003; // 0.3% fee
  
  return {
    ...tokens,
    tvl: `$${(tvl / 1000000).toFixed(2)}M`,
    volume24h: `$${(volume24h / 1000).toFixed(0)}K`,
    apy: `${apy.toFixed(2)}%`,
    fees24h: `$${(fees24h / 1000).toFixed(1)}K`,
          dex: ['Minswap', 'WingRiders', 'Spectrum', 'VyFinance'][Math.floor(Math.random() * 4)]
  };
};

export default function PoolsSection() {
  const [pools, setPools] = useState([]);
  const [sortBy, setSortBy] = useState('tvl');

  useEffect(() => {
    const poolsData = mockPoolTokens.map(generatePoolData);
    setPools(poolsData);
  }, []);

  const sortedPools = [...pools].sort((a, b) => {
    const aVal = parseFloat(a[sortBy].replace(/[$%MK,]/g, ''));
    const bVal = parseFloat(b[sortBy].replace(/[$%MK,]/g, ''));
    return bVal - aVal;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Liquidity Pools</h2>
          <p className="text-muted-foreground">Top performing liquidity pools across Cardano DEXes</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Sort by:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="tvl">TVL</option>
            <option value="volume24h">24h Volume</option>
            <option value="apy">APY</option>
            <option value="fees24h">24h Fees</option>
          </select>
        </div>
      </div>

      <Card className="bg-slate-900/50 border-slate-700">
        <CardContent className="p-0">
          <ScrollArea className="h-[600px]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-700">
                  <tr className="text-left">
                    <th className="p-4 text-sm font-medium text-gray-400">#</th>
                    <th className="p-4 text-sm font-medium text-gray-400">Pool</th>
                    <th className="p-4 text-sm font-medium text-gray-400">TVL</th>
                    <th className="p-4 text-sm font-medium text-gray-400">24h Volume</th>
                    <th className="p-4 text-sm font-medium text-gray-400">APY</th>
                    <th className="p-4 text-sm font-medium text-gray-400">24h Fees</th>
                    <th className="p-4 text-sm font-medium text-gray-400">DEX</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPools.map((pool, index) => (
                    <tr 
                      key={`${pool.tokenA}-${pool.tokenB}`}
                      className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors cursor-pointer"
                    >
                      <td className="p-4 text-gray-400 text-sm">
                        {index + 1}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex -space-x-1">
                            {/* Professional token pair icons */}
                            <div className="w-6 h-6 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full border-2 border-slate-900 flex items-center justify-center">
                              <span className="text-[10px] font-bold text-white">{pool.tokenA.slice(0, 1)}</span>
                            </div>
                            <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full border-2 border-slate-900 flex items-center justify-center">
                              <span className="text-[10px] font-bold text-white">{pool.tokenB.slice(0, 1)}</span>
                            </div>
                          </div>
                          <span className="font-semibold text-white">
                            {pool.tokenA}/{pool.tokenB}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-white">
                        {pool.tvl}
                      </td>
                      <td className="p-4 text-gray-300">
                        {pool.volume24h}
                      </td>
                      <td className="p-4">
                        <span className="text-green-400 font-medium">
                          {pool.apy}
                        </span>
                      </td>
                      <td className="p-4 text-gray-300">
                        {pool.fees24h}
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="border-teal-500 text-teal-400">
                          {pool.dex}
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