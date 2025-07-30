import React from 'react';
import { Badge } from '@/components/ui/badge';
import WalletConnection from './WalletConnection';

const DexyMiniLogo = () => (
  <div className="w-8 h-8 relative">
    <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg rotate-12"></div>
    <div className="absolute inset-1 bg-gradient-to-br from-orange-400 to-orange-600 rounded-md rotate-6"></div>
    <div className="absolute inset-2 bg-gray-900 rounded-sm flex items-center justify-center">
      <div className="w-2 h-2 bg-gradient-to-br from-teal-400 to-orange-500 rounded-sm"></div>
    </div>
  </div>
);

export default function Navigation({ activeTab, setActiveTab, onBackToLanding }) {
  const navItems = [
    { id: 'trending', label: 'Trending', icon: '🔥' },
    { id: 'trades', label: 'Trades', icon: '📊' },
    { id: 'pools', label: 'Pools', icon: '💧' },
    { id: 'analytics', label: 'Analytics', icon: '📈' }
  ];

  return (
    <nav className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 mb-6 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <DexyMiniLogo />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-orange-400 bg-clip-text text-transparent">
              DEXY
            </h1>
            <Badge variant="secondary" className="ml-1">Beta</Badge>
          </div>
          
          <div className="hidden md:block w-px h-6 bg-slate-600"></div>
          
          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right side - Social Links and Wallet */}
        <div className="flex items-center space-x-4">
          {/* Social Links */}
          <div className="hidden lg:flex items-center space-x-3">
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors"
              title="Discord"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
              </svg>
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors"
              title="X (Twitter)"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>

          {/* Back to Landing Button */}
          <button 
            onClick={onBackToLanding}
            className="text-sm text-gray-400 hover:text-teal-400 transition-colors hidden lg:block"
          >
            ← Landing
          </button>

          {/* Network Status */}
          <div className="hidden lg:flex items-center text-sm text-gray-400">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Cardano
          </div>

          {/* Wallet Connection */}
          <WalletConnection />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden mt-4 pt-4 border-t border-slate-700">
        <div className="grid grid-cols-2 gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}