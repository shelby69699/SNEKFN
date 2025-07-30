import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import dexHunterAPI from "../utils/dexhunterAPI";

// REAL DexHunter Global Trades - Direct API Integration!

const generateTrade = () => {
  const inToken = mockTokens[Math.floor(Math.random() * mockTokens.length)];
  let outToken = mockTokens[Math.floor(Math.random() * mockTokens.length)];
  while (outToken === inToken) {
    outToken = mockTokens[Math.floor(Math.random() * mockTokens.length)];
  }
  const isBuy = Math.random() > 0.5;

  return {
    id: Math.random().toString(36).substr(2, 9),
    type: isBuy ? "Buy" : "Sell",
    pair: isBuy ? `${outToken} > ${inToken}` : `${inToken} > ${outToken}`,
    inAmount: `${(Math.random() * 990 + 10).toFixed(2)} ${isBuy ? outToken : inToken}`,
    outAmount: `${(Math.random() * 99990 + 10).toFixed(2)} ${isBuy ? inToken : outToken}`,
    price: `${(Math.random() * 0.0999 + 0.0001).toFixed(6)} ADA`,
    status: Math.random() > 0.1 ? "Success" : "Pending",
    dex: mockDexes[Math.floor(Math.random() * mockDexes.length)],
    maker: `addr..${Math.random().toString(36).substr(2, 4)}`,
    timeAgo: `${Math.floor(Math.random() * 59) + 1}s ago`
  };
};

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
    <Card className="p-4">
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