import React from 'react';
import { Card } from '@/components/ui/card';

export default function Header() {
  return (
    <Card className="p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            SNEKFN
          </h1>
          <span className="text-muted-foreground">DEX Aggregator</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            <span className="text-green-500">●</span> Connected to Cardano Mainnet
          </div>
        </div>
      </div>
    </Card>
  );
}