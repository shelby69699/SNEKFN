import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

// NO MOCK DATA - POOLS SECTION DISABLED UNTIL REAL DATA AVAILABLE
export default function PoolsSection() {
  return (
    <Card className="bg-slate-950 border-slate-800">
      <CardContent className="p-6">
        <div className="text-xl font-semibold mb-4 text-white">Liquidity Pools</div>
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg font-bold mb-3">Real Pool Data Coming Soon</div>
          <div className="text-gray-500 text-sm">NO MOCK DATA - Only real Cardano DEX pool data will be shown</div>
        </div>
      </CardContent>
    </Card>
  );
}