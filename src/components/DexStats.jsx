import { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { useRealTimeData } from '../hooks/useRealTimeData';
// REAL DATA ONLY - NO MOCK IMPORTS

export default function DexStats() {
  // Use real-time data hook - show "Loading..." when backend not connected
  const { stats: apiStats, isLoading, error, backendConnected } = useRealTimeData();
  
  // Use backend data if available, otherwise show loading state
  const displayStats = (backendConnected && apiStats && Object.keys(apiStats).length > 0) ? apiStats : { 
    totalVolume24h: "Loading...",
    totalTrades24h: "Loading...", 
    avgTradeSize: "Loading...",
    activeTokens: "Loading..." 
  };
  
  console.log('🎯 DexStats data source:', {
    backendConnected,
    hasApiStats: !!(apiStats && Object.keys(apiStats).length > 0),
    displayStats
  });

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
          <div className="text-2xl font-bold">{formatNumber(displayStats.totalVolume24h)}</div>
        </CardContent>
      </Card>
      <Card className="p-4">
        <CardContent className="p-0">
          <div className="text-sm text-muted-foreground">24h Trades</div>
          <div className="text-2xl font-bold">{formatNumber(displayStats.totalTrades24h)}</div>
        </CardContent>
      </Card>
      <Card className="p-4">
        <CardContent className="p-0">
          <div className="text-sm text-muted-foreground">Avg Trade Size</div>
          <div className="text-2xl font-bold">{displayStats.avgTradeSize}</div>
        </CardContent>
      </Card>
      <Card className="p-4">
        <CardContent className="p-0">
          <div className="text-sm text-muted-foreground">Active Tokens</div>
          <div className="text-2xl font-bold">{displayStats.activeTokens}</div>
        </CardContent>
      </Card>
    </div>
  );
}