import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function WalletDemo() {
  return (
    <Card className="bg-slate-900/50 border-slate-700 mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">🔗 Real Cardano Wallet Integration</h3>
            <p className="text-gray-400 text-sm">
              DEXY now supports real Cardano wallet connections! Install any supported wallet and click "Connect Wallet" to test.
            </p>
          </div>
          <Badge variant="success" className="bg-green-600/20 text-green-400 border-green-600/30">
            Live Integration
          </Badge>
        </div>
        
        <div className="mt-4 p-4 bg-slate-800 rounded-lg border border-slate-700">
          <div className="text-sm text-gray-300 mb-2">
            <strong>Supported Wallets:</strong>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="bg-slate-700 px-2 py-1 rounded">🦎 Nami</span>
            <span className="bg-slate-700 px-2 py-1 rounded">♾️ Eternl</span>
            <span className="bg-slate-700 px-2 py-1 rounded">🎭 Lace</span>
            <span className="bg-slate-700 px-2 py-1 rounded">🔥 Flint</span>
            <span className="bg-slate-700 px-2 py-1 rounded">🌊 Typhon</span>
          </div>
          
          <div className="mt-3 text-xs text-gray-400">
            💡 <strong>Tip:</strong> If you don't have a Cardano wallet installed, the system will guide you to install one.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}