import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Professional DEXY Mini Logo - 3D Hexagonal Design for Header
const DexyMiniLogo = () => (
  <div className="w-8 h-8 relative group cursor-pointer">
    {/* Mini 3D Hexagonal Framework */}
    <div className="absolute inset-0.5 transform rotate-12 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
      {/* Hexagonal structure */}
      <div className="relative w-7 h-7">
        <div className="absolute inset-0 border-2 border-teal-400"
             style={{
               clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)'
             }}>
        </div>
        
        {/* 3D depth */}
        <div className="absolute inset-0 border border-teal-500 transform translate-x-0.5 translate-y-0.5 opacity-60"
             style={{
               clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)'
             }}>
        </div>
      </div>
      
      {/* Connection nodes at vertices */}
      <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
      <div className="absolute top-1/4 -right-0.5 w-1 h-1 bg-white rounded-full"></div>
      <div className="absolute bottom-1/4 -right-0.5 w-1 h-1 bg-white rounded-full"></div>
      <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
      <div className="absolute bottom-1/4 -left-0.5 w-1 h-1 bg-white rounded-full"></div>
      <div className="absolute top-1/4 -left-0.5 w-1 h-1 bg-white rounded-full"></div>
    </div>
    
    {/* Central Orange 3D Cube */}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="relative w-2.5 h-2.5">
        {/* Cube faces */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-300 to-orange-500 rounded-sm transform -translate-y-0.5 -translate-x-0.5 scale-75"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-700 rounded-sm transform translate-x-0.5 translate-y-0.5 scale-75"></div>
      </div>
    </div>
    
    {/* Professional hover glow */}
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