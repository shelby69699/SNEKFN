import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { faker } from '@faker-js/faker';

export default function DexStats() {
  const [stats, setStats] = useState({
    totalVolume24h: 0,
    totalTrades24h: 0,
    avgTradeSize: 0,
    activeTokens: 0
  });

  useEffect(() => {
    const updateStats = () => {
      setStats({
        totalVolume24h: parseFloat(faker.finance.amount(1000000, 10000000, 2)),
        totalTrades24h: faker.datatype.number({ min: 15000, max: 50000 }),
        avgTradeSize: parseFloat(faker.finance.amount(100, 2000, 2)),
        activeTokens: faker.datatype.number({ min: 150, max: 300 })
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="p-4">
        <CardContent className="p-0">
          <div className="text-sm text-muted-foreground">24h Volume</div>
          <div className="text-2xl font-bold">{formatNumber(stats.totalVolume24h)} ADA</div>
        </CardContent>
      </Card>
      <Card className="p-4">
        <CardContent className="p-0">
          <div className="text-sm text-muted-foreground">24h Trades</div>
          <div className="text-2xl font-bold">{formatNumber(stats.totalTrades24h)}</div>
        </CardContent>
      </Card>
      <Card className="p-4">
        <CardContent className="p-0">
          <div className="text-sm text-muted-foreground">Avg Trade Size</div>
          <div className="text-2xl font-bold">{stats.avgTradeSize} ADA</div>
        </CardContent>
      </Card>
      <Card className="p-4">
        <CardContent className="p-0">
          <div className="text-sm text-muted-foreground">Active Tokens</div>
          <div className="text-2xl font-bold">{stats.activeTokens}</div>
        </CardContent>
      </Card>
    </div>
  );
}