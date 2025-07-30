import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';

export default function WalletConnection() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    setIsConnecting(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnected(true);
      setWalletAddress('addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3y');
      setIsConnecting(false);
    }, 2000);
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
  };

  const shortenAddress = (addr) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected) {
    return (
      <div className="flex items-center space-x-2">
        <Badge variant="success" className="px-3 py-1">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
          Connected
        </Badge>
        <button
          onClick={disconnectWallet}
          className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-600"
        >
          {shortenAddress(walletAddress)}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
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
  );
}