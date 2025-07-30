
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// DEXY Mini Logo - Clean Header Version
const DexyMiniLogo = () => (
  <div className="w-8 h-8 relative group cursor-pointer">
    {/* Simple framework */}
    <div className="absolute inset-0.5 border-2 border-teal-400 rounded-lg transform rotate-12 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 bg-slate-800/20"></div>
    
    {/* Corner nodes */}
    <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full border border-teal-300"></div>
    <div className="absolute top-1/4 -right-0.5 w-1.5 h-1.5 bg-white rounded-full border border-teal-300"></div>
    <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full border border-teal-300"></div>
    <div className="absolute bottom-1/4 -left-0.5 w-1.5 h-1.5 bg-white rounded-full border border-teal-300"></div>
    
    {/* Central cube */}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-2.5 h-2.5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-sm"></div>
    </div>
    
    {/* Hover glow */}
    <div className="absolute inset-0 rounded-lg transform rotate-12 bg-gradient-to-br from-teal-400/30 to-orange-400/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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