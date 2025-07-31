import { Card, CardContent } from '@/components/ui/card';

// MY ORDERS - REAL CARDANO TRADING ORDERS
export default function MyOrders() {
  return (
    <Card className="bg-slate-950 border-slate-800">
      <CardContent className="p-6">
        <div className="text-xl font-semibold mb-4 text-white">My Orders</div>
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">📋</span>
          </div>
          <div className="text-gray-400 text-xl font-bold mb-3">Connect Wallet to View Orders</div>
          <div className="text-gray-500 text-lg mb-6">Your personal trading orders will appear here</div>
          <button className="px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg shadow-teal-600/30">
            Connect Wallet
          </button>
        </div>
      </CardContent>
    </Card>
  );
}