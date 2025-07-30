import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Your ACTUAL DEXY logo for header - cubic framework design  
const DexyMiniLogo = () => (
  <div className="w-8 h-8 relative group cursor-pointer">
    {/* Main cubic framework structure */}
    <div className="absolute inset-0.5 border-2 border-teal-400 rounded-lg transform rotate-12 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
      {/* Framework connection lines */}
      <div className="absolute -inset-0.5">
        <div className="absolute top-0 left-1/4 w-1/2 h-0.5 bg-teal-400"></div>
        <div className="absolute bottom-0 left-1/4 w-1/2 h-0.5 bg-teal-400"></div>
        <div className="absolute left-0 top-1/4 w-0.5 h-1/2 bg-teal-400"></div>
        <div className="absolute right-0 top-1/4 w-0.5 h-1/2 bg-teal-400"></div>
      </div>
    </div>
    
    {/* White connection nodes */}
    <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
    <div className="absolute top-1/4 -right-0.5 w-1.5 h-1.5 bg-white rounded-full"></div>
    <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
    <div className="absolute bottom-1/4 -left-0.5 w-1.5 h-1.5 bg-white rounded-full"></div>
    
    {/* Inner framework */}
    <div className="absolute inset-2 border border-teal-500 rounded-sm bg-slate-800/40">
      {/* Central orange cube */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-2 h-2">
          {/* 3D cube faces */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-300 to-orange-500 rounded-sm transform -translate-y-0.5 -translate-x-0.5"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-700 rounded-sm transform translate-x-0.5 translate-y-0.5"></div>
        </div>
      </div>
    </div>
    
    {/* Hover glow effect */}
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