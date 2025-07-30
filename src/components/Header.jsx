import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const DexyMiniLogo = () => (
  <div className="w-8 h-8 relative">
    <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg rotate-12"></div>
    <div className="absolute inset-1 bg-gradient-to-br from-orange-400 to-orange-600 rounded-md rotate-6"></div>
    <div className="absolute inset-2 bg-gray-900 rounded-sm flex items-center justify-center">
      <div className="w-2 h-2 bg-gradient-to-br from-teal-400 to-orange-500 rounded-sm"></div>
    </div>
  </div>
);

export default function Header({ onBackToLanding }) {
  return (
    <Card className="p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <DexyMiniLogo />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">
            DEXY
          </h1>
          <span className="text-muted-foreground">Aggregator</span>
          <Badge variant="secondary" className="ml-2">Live</Badge>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBackToLanding}
            className="text-sm text-muted-foreground hover:text-teal-400 transition-colors"
          >
            ← Back to Landing
          </button>
          <div className="text-sm text-muted-foreground">
            <span className="text-green-500">●</span> Connected to Cardano Mainnet
          </div>
        </div>
      </div>
    </Card>
  );
}