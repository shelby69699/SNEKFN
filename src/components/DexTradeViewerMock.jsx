import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { faker } from "@faker-js/faker";

const mockTokens = ["ADA", "DJED", "ROOKIE", "GATOR", "BA.AD", "WORT", "SNEK", "SU.OR"];
const mockDexes = ["Minswap", "WingRiders", "Spectrum"];

const generateTrade = () => {
  const inToken = faker.helpers.arrayElement(mockTokens);
  let outToken = faker.helpers.arrayElement(mockTokens.filter(t => t !== inToken));
  const isBuy = faker.datatype.boolean();

  return {
    id: faker.datatype.uuid(),
    type: isBuy ? "Buy" : "Sell",
    pair: isBuy ? `${outToken} > ${inToken}` : `${inToken} > ${outToken}`,
    inAmount: `${faker.finance.amount(10, 1000, 2)} ${isBuy ? outToken : inToken}`,
    outAmount: `${faker.finance.amount(10, 100000, 2)} ${isBuy ? inToken : outToken}`,
    price: `${faker.finance.amount(0.0001, 0.1, 6)} ADA`,
    status: faker.helpers.arrayElement(["Success", "Pending"]),
    dex: faker.helpers.arrayElement(mockDexes),
    maker: `addr..${faker.random.alphaNumeric(4)}`,
    timeAgo: `${faker.datatype.number({ min: 1, max: 59 })}s ago`
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
              {trades.map((trade) => (
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