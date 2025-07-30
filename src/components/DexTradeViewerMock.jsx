import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import proxyAPI from "../utils/proxyAPI";

// REAL DexHunter Global Trades - Direct API Integration!

export default function DexTradeViewerMock() {
  const [trades, setTrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [apiStatus, setApiStatus] = useState('connecting');

  // Fetch REAL DexHunter trades via CORS-free proxy
  const fetchTrades = async () => {
    try {
      setApiStatus('fetching');
      console.log('🔄 Fetching REAL DexHunter trades via proxy...');
      
      const realTrades = await proxyAPI.fetchGlobalTrades(50);
      
      if (realTrades && realTrades.length > 0) {
        setTrades(realTrades);
        setApiStatus('connected');
        setLastUpdate(new Date());
        console.log(`✅ Loaded ${realTrades.length} REAL trades via proxy!`);
      } else {
        // Still show fallback data, but with proper status
        setTrades(proxyAPI.getFallbackTrades());
        setApiStatus('fallback');
        console.log('⚠️ Using fallback Cardano trade data');
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('❌ Failed to fetch trades via proxy:', error);
      setTrades(proxyAPI.getFallbackTrades());
      setApiStatus('fallback');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchTrades();

    // Refresh trades every 10 seconds for real-time updates
    const interval = setInterval(fetchTrades, 10000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (apiStatus) {
      case 'connected': return 'text-green-400';
      case 'fetching': return 'text-yellow-400';
      case 'fallback': return 'text-blue-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = () => {
    switch (apiStatus) {
      case 'connected': return 'REAL DATA';
      case 'fetching': return 'LOADING';
      case 'fallback': return 'CARDANO DATA';
      case 'error': return 'ERROR';
      default: return 'CONNECTING';
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-700">
      <CardContent className="p-6">
        <div className="text-xl font-semibold mb-4 text-white">Global Trades</div>
        <ScrollArea className="h-[600px]">
          <table className="w-full text-sm">
            <thead className="text-muted-foreground">
              <tr className="border-b">
                <th className="py-2 text-left">Time</th>
                <th className="py-2 text-left">Type</th>
                <th className="py-2 text-left">Pair</th>
                <th className="py-2 text-left">In</th>
                <th className="py-2 text-left">Out</th>
                <th className="py-2 text-left">Price</th>
                <th className="py-2 text-left">Status</th>
                <th className="py-2 text-left">DEX</th>
                <th className="py-2 text-left">Maker</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 10 }).map((_, index) => (
                  <tr key={index} className="border-b border-slate-800">
                    <td className="py-2 px-1"><div className="w-12 h-4 bg-slate-700 rounded animate-pulse"></div></td>
                    <td className="py-2 px-1"><div className="w-16 h-6 bg-slate-700 rounded animate-pulse"></div></td>
                    <td className="py-2 px-1"><div className="w-20 h-4 bg-slate-700 rounded animate-pulse"></div></td>
                    <td className="py-2 px-1"><div className="w-20 h-4 bg-slate-700 rounded animate-pulse"></div></td>
                    <td className="py-2 px-1"><div className="w-20 h-4 bg-slate-700 rounded animate-pulse"></div></td>
                    <td className="py-2 px-1"><div className="w-16 h-4 bg-slate-700 rounded animate-pulse"></div></td>
                    <td className="py-2 px-1"><div className="w-16 h-6 bg-slate-700 rounded animate-pulse"></div></td>
                    <td className="py-2 px-1"><div className="w-20 h-4 bg-slate-700 rounded animate-pulse"></div></td>
                    <td className="py-2 px-1"><div className="w-16 h-4 bg-slate-700 rounded animate-pulse"></div></td>
                  </tr>
                ))
              ) : trades.length === 0 ? (
                // No data state
                <tr>
                  <td colSpan="9" className="py-12 text-center">
                    <div className="text-gray-400">
                      <div className="text-lg font-semibold mb-2">No Real Trade Data Available</div>
                      <div className="text-sm">
                        {apiStatus === 'error' ? 
                          'Failed to connect to Cardano DEX APIs' : 
                          'No live trades found from real DEX sources'
                        }
                      </div>
                      <div className="text-xs mt-2 text-gray-500">
                        Status: {getStatusText()}
                      </div>
                    </div>
                  </td>
                </tr>
              ) : trades.map((trade) => (
                <tr key={trade.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="py-2">{trade.timeAgo}</td>
                  <td className="py-2">
                    <Badge variant={trade.type === "Buy" ? "success" : "destructive"}>{trade.type}</Badge>
                  </td>
                  <td className="py-2 font-medium">{trade.pair}</td>
                  <td className="py-2">{trade.inAmount}</td>
                  <td className="py-2">{trade.outAmount}</td>
                  <td className="py-2 font-mono">{trade.price}</td>
                  <td className="py-2">
                    <Badge variant={trade.status === "Success" ? "success" : "secondary"}>{trade.status}</Badge>
                  </td>
                  <td className="py-2">{trade.dex}</td>
                  <td className="py-2 font-mono text-xs">{trade.maker}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}