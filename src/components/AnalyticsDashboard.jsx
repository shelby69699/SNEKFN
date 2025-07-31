import { Card, CardContent } from '@/components/ui/card';

// NO MOCK DATA - ANALYTICS DISABLED UNTIL REAL DATA AVAILABLE
export default function AnalyticsDashboard() {
  return (
    <Card className="bg-slate-950 border-slate-800">
      <CardContent className="p-6">
        <div className="text-xl font-semibold mb-4 text-white">Analytics Dashboard</div>
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg font-bold mb-3">Real Analytics Coming Soon</div>
          <div className="text-gray-500 text-sm">NO MOCK DATA - Only real Cardano trading analytics will be shown</div>
        </div>
      </CardContent>
    </Card>
  );
}