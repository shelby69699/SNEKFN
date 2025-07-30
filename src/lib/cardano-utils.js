// Cardano wallet utilities

/**
 * Convert hex address to bech32 readable format
 * This is a simplified version - in production, use @emurgo/cardano-serialization-lib
 */
export const formatCardanoAddress = (hexAddress) => {
  if (!hexAddress) return '';
  
  // If already in bech32 format (starts with addr1)
  if (hexAddress.startsWith('addr1')) {
    return hexAddress;
  }
  
  // For hex addresses, return a shortened version
  if (hexAddress.length > 10) {
    return `addr1...${hexAddress.slice(-8)}`;
  }
  
  return hexAddress;
};

/**
 * Shorten any Cardano address for display
 */
export const shortenAddress = (address) => {
  if (!address) return '';
  if (address.length < 10) return address;
  
  if (address.startsWith('addr1')) {
    return `${address.slice(0, 9)}...${address.slice(-6)}`;
  }
  
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Convert lovelace to ADA
 */
export const lovelaceToAda = (lovelace) => {
  if (!lovelace) return 0;
  
  // If it's a hex string, convert to number first
  if (typeof lovelace === 'string') {
    // Handle both hex and decimal strings
    const num = lovelace.startsWith('0x') ? parseInt(lovelace, 16) : parseInt(lovelace, 10);
    return num / 1000000;
  }
  
  return lovelace / 1000000;
};

/**
 * Format ADA balance for display
 */
export const formatAdaBalance = (lovelace) => {
  const ada = lovelaceToAda(lovelace);
  
  if (ada === 0) return '0 ADA';
  if (ada < 0.001) return '< 0.001 ADA';
  if (ada < 1) return `${ada.toFixed(3)} ADA`;
  if (ada < 1000) return `${ada.toFixed(2)} ADA`;
  if (ada < 1000000) return `${(ada / 1000).toFixed(1)}K ADA`;
  
  return `${(ada / 1000000).toFixed(1)}M ADA`;
};

/**
 * Check if wallet is supported
 */
export const getSupportedWallets = () => {
  if (typeof window === 'undefined') return [];
  
  const wallets = [];
  
  // Check for Nami
  if (window.cardano?.nami) {
    wallets.push({ name: 'Nami', key: 'nami', icon: '🦎' });
  }
  
  // Check for Eternl
  if (window.cardano?.eternl) {
    wallets.push({ name: 'Eternl', key: 'eternl', icon: '♾️' });
  }
  
  // Check for Lace
  if (window.cardano?.lace) {
    wallets.push({ name: 'Lace', key: 'lace', icon: '🎭' });
  }
  
  // Check for Flint
  if (window.cardano?.flint) {
    wallets.push({ name: 'Flint', key: 'flint', icon: '🔥' });
  }
  
  // Check for Typhon
  if (window.cardano?.typhon) {
    wallets.push({ name: 'Typhon', key: 'typhon', icon: '🌊' });
  }
  
  return wallets;
};

/**
 * Get network info
 */
export const getNetworkInfo = async (api) => {
  try {
    const networkId = await api.getNetworkId();
    return {
      networkId,
      networkName: networkId === 1 ? 'Mainnet' : networkId === 0 ? 'Testnet' : 'Unknown'
    };
  } catch (error) {
    console.error('Failed to get network info:', error);
    return { networkId: null, networkName: 'Unknown' };
  }
};