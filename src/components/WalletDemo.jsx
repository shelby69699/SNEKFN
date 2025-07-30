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
        
        <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-teal-500/20 relative overflow-hidden">
          {/* DEXY geometric pattern */}
          <div className="absolute top-2 right-2 opacity-10">
            <div className="w-8 h-8 border border-teal-400 rounded-lg rotate-12">
              <div className="w-full h-full bg-orange-400/30 rounded-md rotate-6"></div>
            </div>
          </div>
          
          <div className="text-sm text-gray-300 mb-2 relative z-10">
            <strong>Supported Wallets:</strong>
          </div>
          <div className="flex flex-wrap gap-2 text-sm relative z-10">
            <span className="bg-gradient-to-r from-teal-600/20 to-orange-600/20 border border-teal-500/30 px-3 py-1 rounded-full">🦎 Nami</span>
            <span className="bg-gradient-to-r from-teal-600/20 to-orange-600/20 border border-teal-500/30 px-3 py-1 rounded-full">♾️ Eternl</span>
            <span className="bg-gradient-to-r from-teal-600/20 to-orange-600/20 border border-teal-500/30 px-3 py-1 rounded-full">🎭 Lace</span>
            <span className="bg-gradient-to-r from-teal-600/20 to-orange-600/20 border border-teal-500/30 px-3 py-1 rounded-full">🔥 Flint</span>
            <span className="bg-gradient-to-r from-teal-600/20 to-orange-600/20 border border-teal-500/30 px-3 py-1 rounded-full">🌊 Typhon</span>
          </div>
          
          <div className="mt-3 text-xs text-gray-400 relative z-10">
            💡 <strong>Tip:</strong> If you don't have a Cardano wallet installed, the system will guide you to install one.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}