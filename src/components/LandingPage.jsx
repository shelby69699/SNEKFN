import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const DexyLogo = () => (
  <div className="relative w-24 h-24 mx-auto mb-6">
    <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl rotate-12 opacity-90"></div>
    <div className="absolute inset-2 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl rotate-6"></div>
    <div className="absolute inset-4 bg-gray-900 rounded-lg flex items-center justify-center">
      <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-orange-500 rounded transform rotate-45"></div>
    </div>
    <div className="absolute -top-1 -left-1 w-3 h-3 bg-white rounded-full opacity-80"></div>
    <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full opacity-80"></div>
    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white rounded-full opacity-80"></div>
    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white rounded-full opacity-80"></div>
    <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full opacity-60"></div>
    <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full opacity-60"></div>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-teal-500/5 to-orange-500/5 rounded-full blur-3xl"></div>
      </div>

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
            <Badge variant="secondary" className="ml-2">Beta</Badge>
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
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            The most capital efficient trading protocol on Cardano.<br />
            <span className="text-teal-400">Aggregating liquidity across all major DEXes.</span>
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
        <h3 className="text-3xl font-bold text-white text-center mb-12">Why Choose DEXY?</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
              <p className="text-gray-400">{feature.desc}</p>
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
        <Card className="p-8 bg-slate-800/30 border-slate-700 backdrop-blur-sm">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-teal-400 mb-2">$50M+</div>
              <div className="text-gray-400">Total Volume Aggregated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400 mb-2">100K+</div>
              <div className="text-gray-400">Successful Swaps</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">5.2%</div>
              <div className="text-gray-400">Average Savings</div>
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