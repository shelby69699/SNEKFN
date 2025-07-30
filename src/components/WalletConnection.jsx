import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatAdaBalance, shortenAddress, getSupportedWallets, getNetworkInfo } from '@/lib/cardano-utils';

// Wallet descriptions for the modal
const WALLET_DESCRIPTIONS = {
  nami: "Popular Cardano wallet with built-in DeFi features",
  eternl: "Advanced Cardano wallet with staking and multi-account support", 
  lace: "IOG's official light wallet for Cardano",
  flint: "Fast and secure Cardano wallet",
  typhon: "Feature-rich Cardano wallet with DApp connector"
};

export default function WalletConnection() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletName, setWalletName] = useState('');
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [availableWallets, setAvailableWallets] = useState([]);
  const [balance, setBalance] = useState('');

  // Check which wallets are installed
  useEffect(() => {
    const checkWallets = () => {
      const supported = getSupportedWallets();
      setAvailableWallets(supported);
    };

    checkWallets();
    // Recheck after a short delay in case wallets load asynchronously
    setTimeout(checkWallets, 1000);
    
    // Listen for wallet installations
    const interval = setInterval(checkWallets, 5000);
    return () => clearInterval(interval);
  }, []);

  const connectWallet = async (walletKey, walletDisplayName) => {
    try {
      setIsConnecting(true);
      
      if (!window.cardano || !window.cardano[walletKey]) {
        alert(`${walletDisplayName} wallet not found. Please install it first.`);
        setIsConnecting(false);
        return;
      }

      // Check if wallet is already enabled
      const isEnabled = await window.cardano[walletKey].isEnabled();
      let api;
      
      if (!isEnabled) {
        // Request permission to connect
        api = await window.cardano[walletKey].enable();
      } else {
        api = await window.cardano[walletKey].enable();
      }

      if (api) {
        setIsConnected(true);
        setWalletName(walletDisplayName);
        setShowWalletModal(false);

        // Get wallet address
        try {
          const usedAddresses = await api.getUsedAddresses();
          const unusedAddresses = await api.getUnusedAddresses();
          
          let address = '';
          if (usedAddresses && usedAddresses.length > 0) {
            // Convert from hex to bech32 if needed
            address = usedAddresses[0];
          } else if (unusedAddresses && unusedAddresses.length > 0) {
            address = unusedAddresses[0];
          }
          
          if (address) {
            // If address is in hex, convert to readable format
            if (address.startsWith('01') || address.startsWith('00')) {
              // This is a hex address, use it as is for now
              setWalletAddress(address);
            } else {
              setWalletAddress(address);
            }
          }

          // Get balance
          try {
            const balanceValue = await api.getBalance();
            if (balanceValue) {
              const formattedBalance = formatAdaBalance(balanceValue);
              setBalance(formattedBalance);
            }
            
            // Get network info
            const networkInfo = await getNetworkInfo(api);
            console.log('Connected to:', networkInfo.networkName);
          } catch (balanceError) {
            console.log('Could not fetch balance:', balanceError);
            setBalance('Balance unavailable');
          }

        } catch (addressError) {
          console.log('Could not fetch address:', addressError);
          setWalletAddress('Address unavailable');
        }
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
      alert(`Failed to connect to ${walletDisplayName}. Please try again.`);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    setWalletName('');
    setBalance('');
  };



  const openWalletModal = () => {
    if (availableWallets.length === 0) {
      alert('No Cardano wallets detected. Please install Nami, Eternl, Lace, or another supported wallet.');
      return;
    }
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
          className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-600 flex items-center space-x-2"
          title={`Balance: ${balance}\nAddress: ${walletAddress}`}
        >
          <span>{shortenAddress(walletAddress)}</span>
          <span className="text-xs text-gray-400">🔗</span>
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
                {availableWallets.length > 0 ? (
                  availableWallets.map((wallet) => (
                    <button
                      key={wallet.key}
                      onClick={() => connectWallet(wallet.key, wallet.name)}
                      disabled={isConnecting}
                      className="w-full p-4 border border-slate-700 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{wallet.icon}</span>
                        <div className="flex-1">
                          <div className="font-semibold text-white">{wallet.name}</div>
                          <div className="text-sm text-gray-400">
                            {WALLET_DESCRIPTIONS[wallet.key] || "Cardano wallet"}
                          </div>
                        </div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🚫</div>
                    <div className="text-white font-semibold mb-2">No Wallets Found</div>
                    <div className="text-gray-400 text-sm mb-4">
                      Please install a Cardano wallet to continue
                    </div>
                    <div className="space-y-2 text-sm">
                      <a 
                        href="https://namiwallet.io/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-teal-400 hover:text-teal-300 transition-colors"
                      >
                        📱 Install Nami Wallet
                      </a>
                      <a 
                        href="https://eternl.io/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-teal-400 hover:text-teal-300 transition-colors"
                      >
                        ♾️ Install Eternl Wallet
                      </a>
                      <a 
                        href="https://www.lace.io/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-teal-400 hover:text-teal-300 transition-colors"
                      >
                        🎭 Install Lace Wallet
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 p-3 bg-slate-800 rounded-lg border border-slate-700">
                <div className="text-xs text-gray-400">
                  🔒 Your wallet connection is secure and only used for displaying balances and enabling transactions. DEXY never stores your private keys.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}