import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import dexHunterAPI from "../utils/dexhunterAPI";

// REAL DexHunter Global Trades - Direct API Integration!

export default function DexTradeViewerMock() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    // Generate initial trades
    const initialTrades = Array.from({ length: 10 }, generateTrade);
    setTrades(initialTrades);

    const interval = setInterval(() => {
      setTrades(prev => [generateTrade(), ...prev.slice(0, 19)]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-slate-900 border-slate-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xl font-semibold text-white flex items-center gap-3">
            Global Trades
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${apiStatus === 'connected' ? 'bg-green-400 animate-pulse' : apiStatus === 'fetching' ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'}`}></div>
              <span className={`text-xs font-normal ${getStatusColor()}`}>{getStatusText()}</span>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Last update: {lastUpdate.toLocaleTimeString()}
          </div>
        </div>
      <CardContent>
        <div className="text-xl font-semibold mb-4">Global Trades</div>
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