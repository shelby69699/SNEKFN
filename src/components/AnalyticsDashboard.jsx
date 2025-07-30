import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { faker } from '@faker-js/faker';

export default function AnalyticsDashboard() {
  const [marketData, setMarketData] = useState({
    totalValueLocked: 0,
    volume24h: 0,
    totalTrades: 0,
    activePairs: 0,
    topGainers: [],
    topLosers: [],
    volumeChart: []
  });

  useEffect(() => {
    // Generate mock analytics data
    const topGainers = Array.from({ length: 5 }, () => ({
      symbol: faker.helpers.arrayElement(['SNEK', 'HOSKY', 'ROOKIE', 'GATOR', 'WORT']),
      change: faker.datatype.number({ min: 20, max: 200, precision: 0.01 }),
      volume: faker.datatype.number({ min: 100000, max: 1000000 })
    }));

    const topLosers = Array.from({ length: 5 }, () => ({
      symbol: faker.helpers.arrayElement(['DJED', 'MIN', 'SUNDAE', 'WRT', 'VYFI']),
      change: faker.datatype.number({ min: -50, max: -5, precision: 0.01 }),
      volume: faker.datatype.number({ min: 50000, max: 800000 })
    }));

    const volumeChart = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      volume: faker.datatype.number({ min: 500000, max: 2000000 })
    }));

    setMarketData({
      totalValueLocked: faker.datatype.number({ min: 50000000, max: 200000000 }),
      volume24h: faker.datatype.number({ min: 10000000, max: 50000000 }),
      totalTrades: faker.datatype.number({ min: 50000, max: 200000 }),
      activePairs: faker.datatype.number({ min: 200, max: 500 }),
      topGainers,
      topLosers,
      volumeChart
    });
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num}`;
  };

  const formatLargeNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Analytics</h2>
        <p className="text-muted-foreground">Market insights and performance metrics</p>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-6">
            <div className="text-sm text-gray-400 mb-2">Total Value Locked</div>
            <div className="text-2xl font-bold text-white">
              {formatNumber(marketData.totalValueLocked)}
            </div>
            <div className="text-sm text-green-400 mt-1">+12.5% (24h)</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-6">
            <div className="text-sm text-gray-400 mb-2">24h Volume</div>
            <div className="text-2xl font-bold text-white">
              {formatNumber(marketData.volume24h)}
            </div>
            <div className="text-sm text-red-400 mt-1">-3.2% (24h)</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-6">
            <div className="text-sm text-gray-400 mb-2">Total Trades</div>
            <div className="text-2xl font-bold text-white">
              {formatLargeNumber(marketData.totalTrades)}
            </div>
            <div className="text-sm text-green-400 mt-1">+8.7% (24h)</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-6">
            <div className="text-sm text-gray-400 mb-2">Active Pairs</div>
            <div className="text-2xl font-bold text-white">
              {marketData.activePairs}
            </div>
            <div className="text-sm text-green-400 mt-1">+15 (24h)</div>
          </CardContent>
        </Card>
      </div>

      {/* Top Movers */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">🚀 Top Gainers (24h)</h3>
            <div className="space-y-3">
              {marketData.topGainers.map((token, index) => (
                <div key={token.symbol} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400 text-sm">#{index + 1}</span>
                    {token.symbol === 'DEXY' ? (
                      // Your ACTUAL DEXY logo
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
                      // Professional token icons
                      <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg flex items-center justify-center border border-slate-500">
                        <span className="text-xs font-bold text-white">{token.symbol.slice(0, 2)}</span>
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-white">{token.symbol}</div>
                      <div className="text-sm text-gray-400">{formatNumber(token.volume)} vol</div>
                    </div>
                  </div>
                  <Badge variant="success" className="bg-green-600/20 text-green-400 border-green-600/30">
                    +{token.change.toFixed(1)}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">📉 Top Losers (24h)</h3>
            <div className="space-y-3">
              {marketData.topLosers.map((token, index) => (
                <div key={token.symbol} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-400 text-sm">#{index + 1}</span>
                    {token.symbol === 'DEXY' ? (
                      // Your ACTUAL DEXY logo
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
                      // Professional token icons
                      <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg flex items-center justify-center border border-slate-500">
                        <span className="text-xs font-bold text-white">{token.symbol.slice(0, 2)}</span>
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-white">{token.symbol}</div>
                      <div className="text-sm text-gray-400">{formatNumber(token.volume)} vol</div>
                    </div>
                  </div>
                  <Badge variant="destructive" className="bg-red-600/20 text-red-400 border-red-600/30">
                    {token.change.toFixed(1)}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Volume Chart Placeholder */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">📈 24h Volume Distribution</h3>
          <div className="h-64 flex items-end justify-between space-x-1">
            {marketData.volumeChart.map((data, index) => (
              <div
                key={index}
                className="bg-gradient-to-t from-teal-600 to-orange-500 rounded-t opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                style={{
                  height: `${(data.volume / 2000000) * 100}%`,
                  width: '100%'
                }}
                title={`Hour ${data.hour}: ${formatNumber(data.volume)}`}
              ></div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
        </CardContent>
      </Card>

      {/* DEX Breakdown */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">🏢 DEX Market Share</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Minswap', share: 45.2, volume: '$12.5M' },
              { name: 'WingRiders', share: 28.7, volume: '$7.9M' },
              { name: 'Spectrum', share: 16.8, volume: '$4.6M' },
              { name: 'Others', share: 9.3, volume: '$2.6M' }
            ].map((dex) => (
              <div key={dex.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white">{dex.name}</span>
                  <span className="text-gray-400">{dex.share}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-teal-500 to-orange-500 h-2 rounded-full"
                    style={{ width: `${dex.share}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-400">{dex.volume} (24h)</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}