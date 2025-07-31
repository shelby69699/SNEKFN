import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useRealTimeData } from '../hooks/useRealTimeData';
// REAL DATA ONLY - NO MOCK IMPORTS

export default function DexStats() {
  // Use real-time data hook
  const { stats, isLoading, error, backendConnected } = useRealTimeData();
  
  // Default stats if no data available
  const displayStats = stats && Object.keys(stats).length > 0 ? stats : {
    totalVolume24h: "—",
    totalTrades24h: "—", 
    avgTradeSize: "—",
    activeTokens: "—"
  };

  const formatNumber = (value) => {
    // If it's already formatted (like "10.0M ADA"), return as is
    if (typeof value === 'string') return value;
    
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="p-4">
        <CardContent className="p-0">
          <div className="text-sm text-muted-foreground">24h Volume</div>
          <div className="text-2xl font-bold">{formatNumber(stats.totalVolume24h)}</div>
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
          <div className="text-2xl font-bold">{stats.avgTradeSize}</div>
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