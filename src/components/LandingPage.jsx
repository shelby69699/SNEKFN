import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DexyBackground from './DexyBackground';

// Your REAL professional DEXY logo - exact recreation from your design
const DexyLogo = () => (
  <div className="relative w-48 h-48 mx-auto mb-8 transform hover:scale-105 transition-transform duration-500">
    {/* 3D Cubic Framework Structure */}
    <div className="absolute inset-0">
      {/* Outer framework hexagon/cube structure */}
      <div className="absolute inset-6">
        {/* Main cubic framework */}
        <div className="relative w-full h-full">
          {/* Top hexagonal structure */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20">
            <div className="absolute inset-0 border-4 border-teal-400 transform rotate-45" style={{
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
            }}></div>
          </div>
          
          {/* Main vertical framework lines */}
          <div className="absolute left-1/2 top-8 w-1 h-16 bg-gradient-to-b from-teal-400 to-teal-500 transform -translate-x-1/2"></div>
          <div className="absolute left-8 top-12 w-1 h-12 bg-gradient-to-b from-teal-400 to-teal-500 transform rotate-30"></div>
          <div className="absolute right-8 top-12 w-1 h-12 bg-gradient-to-b from-teal-400 to-teal-500 transform -rotate-30"></div>
          
          {/* Side framework structures */}
          <div className="absolute left-2 top-16 w-16 h-16 border-3 border-teal-500 transform -rotate-12 opacity-80"></div>
          <div className="absolute right-2 top-16 w-16 h-16 border-3 border-teal-500 transform rotate-12 opacity-80"></div>
          
          {/* Bottom cubic structure */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-24">
            <div className="absolute inset-0 border-4 border-teal-400 rounded-lg transform rotate-45 skew-x-12"></div>
            <div className="absolute inset-2 border-2 border-teal-500 rounded-md transform -rotate-12"></div>
          </div>
        </div>
      </div>
      
      {/* Connection nodes - white dots at intersections */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg border-2 border-teal-300"></div>
      <div className="absolute top-8 left-8 w-3 h-3 bg-white rounded-full shadow-lg border-2 border-teal-300"></div>
      <div className="absolute top-8 right-8 w-3 h-3 bg-white rounded-full shadow-lg border-2 border-teal-300"></div>
      <div className="absolute left-2 top-20 w-3 h-3 bg-white rounded-full shadow-lg border-2 border-teal-300"></div>
      <div className="absolute right-2 top-20 w-3 h-3 bg-white rounded-full shadow-lg border-2 border-teal-300"></div>
      <div className="absolute bottom-8 left-8 w-3 h-3 bg-white rounded-full shadow-lg border-2 border-teal-300"></div>
      <div className="absolute bottom-8 right-8 w-3 h-3 bg-white rounded-full shadow-lg border-2 border-teal-300"></div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg border-2 border-teal-300"></div>
      
      {/* Central 3D orange cube - the core element */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative w-12 h-12">
          {/* Main cube face */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-lg shadow-2xl border border-orange-300"></div>
          {/* Top face for 3D effect */}
          <div className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-br from-orange-300 to-orange-500 rounded-lg transform skew-x-12 -skew-y-12 opacity-90"></div>
          {/* Right face for 3D effect */}
          <div className="absolute -top-1 -right-1 w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg transform skew-y-12 skew-x-12 opacity-80"></div>
          {/* Inner glow */}
          <div className="absolute inset-1 bg-gradient-to-br from-orange-200 to-orange-400 rounded-md opacity-60"></div>
        </div>
      </div>
      
      {/* Inner framework details */}
      <div className="absolute inset-12 border border-teal-600 rounded-xl transform rotate-12 bg-slate-800/10 backdrop-blur-sm"></div>
      <div className="absolute inset-16 border border-teal-500 rounded-lg transform -rotate-6 bg-slate-800/20"></div>
    </div>
    
    {/* Professional glow effects */}
    <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-orange-400/20 blur-2xl rounded-full"></div>
    <div className="absolute inset-4 bg-gradient-to-tr from-teal-300/10 to-orange-300/10 blur-xl rounded-full"></div>
  </div>
);

export default function LandingPage({ onEnterApp }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLaunchApp = () => {
    setIsLoading(true);
    setTimeout(() => {
      onEnterApp();
    }, 1000);
  };

  const features = [
    { icon: "⚡", title: "Lightning Fast", desc: "Real-time aggregation across all major Cardano DEXes" },
    { icon: "🔍", title: "Best Prices", desc: "Find optimal swap routes and maximize your returns" },
    { icon: "🔒", title: "Secure", desc: "Non-custodial trading with maximum security" },
    { icon: "📊", title: "Analytics", desc: "Advanced trading insights and market analytics" }
  ];

  const supportedDexes = ["Minswap", "WingRiders", "Spectrum", "MuesliSwap", "VyFinance"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-950/30 to-slate-900 relative overflow-hidden">
      {/* Your DEXY geometric background */}
      <DexyBackground />

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg rotate-12"></div>
              <div className="absolute inset-1 bg-gradient-to-br from-orange-400 to-orange-600 rounded-md rotate-6"></div>
              <div className="absolute inset-2 bg-gray-900 rounded-sm"></div>
            </div>
            <span className="text-2xl font-bold text-white">DEXY</span>
            <Badge variant="secondary" className="ml-2 bg-green-600/20 text-green-400 border-green-600/30">Live</Badge>
          </div>
          <div className="hidden md:flex space-x-8 text-gray-300">
            <a href="#features" className="hover:text-teal-400 transition-colors">Features</a>
            <a href="#supported" className="hover:text-teal-400 transition-colors">Supported DEXes</a>
            <a href="#about" className="hover:text-teal-400 transition-colors">About</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center">
          <DexyLogo />
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-teal-200 to-orange-200 bg-clip-text text-transparent">
              DEXY
            </span>
          </h1>
          
          <div className="text-xl md:text-2xl text-gray-300 mb-4 font-light">
            — AGGREGATOR —
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Maximize Returns.<br />
            <span className="bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">
              Optimize Profits.
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            The most capital efficient trading protocol on Cardano.<br />
            <span className="bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent font-semibold">
              Powered by advanced geometric algorithms and unified liquidity.
            </span>
          </p>
          
          <button
            onClick={handleLaunchApp}
            disabled={isLoading}
            className="bg-gradient-to-r from-teal-500 to-orange-500 hover:from-teal-400 hover:to-orange-400 text-white font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-teal-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Launching...
              </span>
            ) : (
              "Launch App"
            )}
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <h3 className="text-3xl font-bold text-white text-center mb-4">Why Choose DEXY?</h3>
        <p className="text-center text-gray-400 mb-12">Experience next-generation DeFi with geometric precision</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-slate-800/30 border border-teal-500/20 backdrop-blur-sm hover:bg-slate-800/50 hover:border-teal-400/40 transition-all duration-300 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h4 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent mb-2">{feature.title}</h4>
              <p className="text-gray-300">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Supported DEXes */}
      <div id="supported" className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <h3 className="text-3xl font-bold text-white text-center mb-12">Supported DEXes</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {supportedDexes.map((dex, index) => (
            <Badge key={index} variant="outline" className="px-6 py-3 text-lg border-teal-500/30 text-teal-300 hover:bg-teal-500/10 transition-colors">
              {dex}
            </Badge>
          ))}
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-400">And more being integrated...</p>
        </div>
      </div>

      {/* Stats Preview */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <Card className="p-8 bg-slate-800/20 border border-teal-500/30 backdrop-blur-sm relative overflow-hidden">
          {/* DEXY geometric pattern overlay */}
          <div className="absolute top-4 right-4 opacity-10">
            <div className="w-16 h-16 border-2 border-teal-400 rounded-xl rotate-12">
              <div className="w-full h-full bg-orange-400/20 rounded-lg rotate-6"></div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center relative z-10">
            <div className="group">
              <div className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-teal-300 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">$50M+</div>
              <div className="text-gray-300">Total Volume Aggregated</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">100K+</div>
              <div className="text-gray-300">Successful Swaps</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">5.2%</div>
              <div className="text-gray-300">Average Savings</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400">
          <p>&copy; 2024 DEXY Aggregator. Built for the Cardano ecosystem.</p>
        </div>
      </footer>
    </div>
  );
}