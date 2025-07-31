import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

// Professional wallet list with real logos
const WALLETS = [
  { 
    name: 'VESPR', 
    key: 'vespr', 
    logo: 'https://avatars.githubusercontent.com/u/92246442?s=200&v=4',
    description: 'Browser wallet with built-in DeFi features'
  },
  { 
    name: 'Eternl', 
    key: 'eternl', 
    logo: 'https://pbs.twimg.com/profile_images/1455124542603341829/9GlhfuES_400x400.jpg',
    description: 'Advanced wallet with staking support'
  },
  { 
    name: 'Lace', 
    key: 'lace', 
    logo: 'https://pbs.twimg.com/profile_images/1590349942046052352/ixJhw0WE_400x400.jpg',
    description: 'IOG\'s official light wallet'
  },
  { 
    name: 'Flint', 
    key: 'flint', 
    logo: 'https://pbs.twimg.com/profile_images/1438850225311014913/Np6w5TgF_400x400.jpg',
    description: 'Fast and secure Cardano wallet'
  },
  { 
    name: 'Typhon', 
    key: 'typhon', 
    logo: 'https://pbs.twimg.com/profile_images/1555888240688226304/RJP_5xn1_400x400.jpg',
    description: 'Feature-rich wallet with DApp support'
  }
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
      if (typeof window === 'undefined' || !window.cardano || !window.cardano[walletKey]) {
        alert(`${walletDisplayName} wallet not found. Please install it first.`);
        setIsConnecting(false);
        return;
      }

      // Check if wallet is enabled already  
      const walletApi = window.cardano[walletKey];
              console.log(`Attempting to connect to ${walletDisplayName}...`);

      // Connect to wallet
      console.log('Calling enable() on wallet...');
      const api = await walletApi.enable();
      console.log('Wallet enabled successfully:', api);
      
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
    console.log('Opening wallet modal...');
    console.log('Available wallets:', WALLETS.filter(w => window.cardano && window.cardano[w.key]));
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

      {/* Wallet Selection Modal - Rendered at document.body level */}
      {showWalletModal && createPortal(
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[99999] flex items-center justify-center p-4" style={{zIndex: 99999}}>
          <Card className="bg-slate-900 border-slate-700 max-w-md w-full pointer-events-auto relative z-[99999] shadow-2xl" style={{zIndex: 99999}}>
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
                  const isInstalled = typeof window !== 'undefined' && window.cardano && window.cardano[wallet.key];
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
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-white flex items-center justify-center border-2 border-slate-600">
                          <img 
                            src={wallet.logo} 
                            alt={wallet.name}
                            className="w-10 h-10 object-cover rounded-md"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-orange-500 rounded-md hidden items-center justify-center">
                            <span className="text-sm font-bold text-white">{wallet.name[0]}</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-white">{wallet.name}</div>
                          <div className="text-sm text-gray-400">
                            {isInstalled ? wallet.description : 'Not installed'}
                          </div>
                        </div>
                        {isInstalled && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
                      </div>
                    </button>
                  );
                })}
              </div>

            </CardContent>
          </Card>
        </div>,
        document.body
      )}
    </>
  );
}