import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

// Simple wallet list - no complex detection needed
const WALLETS = [
  { name: 'Nami', key: 'nami', icon: '🦎' },
  { name: 'Eternl', key: 'eternl', icon: '♾️' },
  { name: 'Lace', key: 'lace', icon: '🎭' },
  { name: 'Flint', key: 'flint', icon: '🔥' },
  { name: 'Typhon', key: 'typhon', icon: '🌊' }
];

export default function WalletConnection() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletName, setWalletName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [showWalletModal, setShowWalletModal] = useState(false);

  const connectWallet = async (walletKey, walletDisplayName) => {
    try {
      setIsConnecting(true);
      
      // Check if wallet exists
      if (!window.cardano || !window.cardano[walletKey]) {
        alert(`${walletDisplayName} wallet not found. Please install it first.`);
        return;
      }

      // Connect to wallet
      const api = await window.cardano[walletKey].enable();
      
      if (api) {
        // Success!
        setIsConnected(true);
        setWalletName(walletDisplayName);
        setShowWalletModal(false);
        
        // Try to get address (simplified)
        try {
          const addresses = await api.getUsedAddresses();
          if (addresses && addresses.length > 0) {
            const addr = addresses[0];
            // Show shortened version
            setWalletAddress(addr.length > 20 ? `${addr.slice(0, 8)}...${addr.slice(-6)}` : addr);
          } else {
            setWalletAddress('Connected');
          }
        } catch (e) {
          setWalletAddress('Connected');
        }
      }
    } catch (error) {
      console.error('Connection failed:', error);
      alert(`Failed to connect to ${walletDisplayName}. User denied or wallet error.`);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    setWalletName('');
  };

  const openWalletModal = () => {
    setShowWalletModal(true);
  };

  if (isConnected) {
    return (
      <div className="flex items-center space-x-2">
        <Badge variant="success" className="px-3 py-1 bg-green-600/20 text-green-400 border-green-600/30">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
          {walletName}
        </Badge>
        <button
          onClick={disconnectWallet}
          className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-600"
          title={`Disconnect ${walletName}`}
        >
          {walletAddress}
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={openWalletModal}
        disabled={isConnecting}
        className="bg-gradient-to-r from-teal-600 to-orange-600 hover:from-teal-500 hover:to-orange-500 text-white px-6 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
      >
        {isConnecting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Connecting...</span>
          </>
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      {/* Wallet Selection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-slate-900 border-slate-700 max-w-md w-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Connect Wallet</h3>
                <button
                  onClick={() => setShowWalletModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <p className="text-gray-400 mb-6 text-sm">
                Choose your preferred Cardano wallet to connect to DEXY
              </p>

              <div className="space-y-3">
                {WALLETS.map((wallet) => {
                  const isInstalled = window.cardano && window.cardano[wallet.key];
                  return (
                    <button
                      key={wallet.key}
                      onClick={() => connectWallet(wallet.key, wallet.name)}
                      disabled={isConnecting || !isInstalled}
                      className={`w-full p-4 border rounded-lg transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed ${
                        isInstalled 
                          ? 'border-slate-700 bg-slate-800 hover:bg-slate-700' 
                          : 'border-slate-800 bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{wallet.icon}</span>
                        <div className="flex-1">
                          <div className="font-semibold text-white">{wallet.name}</div>
                          <div className="text-sm text-gray-400">
                            {isInstalled ? 'Ready to connect' : 'Not installed'}
                          </div>
                        </div>
                        {isInstalled && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
                      </div>
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-400 mb-2">Don't have a wallet?</p>
                <div className="flex justify-center space-x-4 text-sm">
                  <a 
                    href="https://namiwallet.io/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    Get Nami
                  </a>
                  <a 
                    href="https://eternl.io/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    Get Eternl
                  </a>
                  <a 
                    href="https://www.lace.io/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    Get Lace
                  </a>
                </div>
              </div>

              <div className="mt-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <div className="text-xs text-gray-400">
                  🔒 Secure connection - DEXY never stores your private keys
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}