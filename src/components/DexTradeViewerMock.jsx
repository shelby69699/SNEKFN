import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { useRealTimeData } from '../hooks/useRealTimeData';

// REAL DEXY Global Trades - Direct Backend API Integration!

export default function DexTradeViewerMock() {
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('details'); // 'details' or 'raw'
  
  // Use real-time data hook with fallback to static data
  const { 
    trades: apiTrades,
    tokens: apiTokens, 
    isLoading, 
    error, 
    backendConnected, 
    lastUpdated,
    scraperStatus,
    triggerScrape 
  } = useRealTimeData();

  // Import static data as fallback
  const [staticTokens, setStaticTokens] = useState([]);
  const [staticTrades, setStaticTrades] = useState([]);

  useEffect(() => {
    // Load static data as fallback
    import('../data/dexhunter-data.js').then(module => {
      if (module.DEXY_TOKENS) {
        setStaticTokens(module.DEXY_TOKENS);
      }
    }).catch(console.error);

    import('../data/dexhunter-trades.js').then(module => {
      if (module.DEXY_TRADES) {
        setStaticTrades(module.DEXY_TRADES);
      }
    }).catch(console.error);
  }, []);

  // Use API data if available, fallback to static data
  const trades = apiTrades && apiTrades.length > 0 ? apiTrades : staticTrades;
  const tokens = apiTokens && apiTokens.length > 0 ? apiTokens : staticTokens;
  
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [apiStatus, setApiStatus] = useState('connecting');

  // Update API status based on backend connection
  useEffect(() => {
    if (backendConnected) {
      setApiStatus('connected');
    } else if (error) {
      setApiStatus('error');
    } else {
      setApiStatus('connecting');
    }
  }, [backendConnected, error]);

  // Update last update time when data changes
  useEffect(() => {
    if (lastUpdated) {
      setLastUpdate(new Date(lastUpdated));
    }
  }, [lastUpdated]);

  // Live timer state for updating "ago" times
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Update current time every second for live "ago" calculation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Function to calculate live "time ago" from timestamp
  const getTimeAgo = (timestamp) => {
    if (!timestamp) return 'unknown';
    
    const seconds = Math.floor((currentTime - timestamp) / 1000);
    
    if (seconds < 60) {
      return `${seconds}s ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes}m ago`;
    } else {
      const hours = Math.floor(seconds / 3600);
      return `${hours}h ago`;
    }
  };

  // Sort trades by timestamp (most recent first) and ensure they're properly formatted
  const sortedTrades = [...trades]
    .filter(trade => trade && trade.timestamp)
    .sort((a, b) => b.timestamp - a.timestamp);

  const startRealTimeData = () => {
    console.log('🔥 Starting REAL API trades from DEXY...');
    setApiStatus('connected');
    setLastUpdate(new Date());
  };

  useEffect(() => {
    // Start real-time data
    const cleanup = startRealTimeData();

    // Cleanup on unmount
    return cleanup;
  }, []);

  const getStatusColor = () => {
    switch (apiStatus) {
      case 'connected': return 'text-green-400';
      case 'fetching': return 'text-yellow-400';
      case 'fallback': return 'text-blue-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = () => {
    switch (apiStatus) {
      case 'connected': return 'LIVE DATA';
      case 'fetching': return 'LOADING';
      case 'fallback': return 'CARDANO DATA';
      case 'error': return 'ERROR';
      default: return 'CONNECTING';
    }
  };

  const openTradeDetails = (trade) => {
    setSelectedTrade(trade);
    setModalType('details');
    setShowModal(true);
  };

  const openRawData = (trade) => {
    setSelectedTrade(trade);
    setModalType('raw');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTrade(null);
  };

  return (
    <Card className="bg-slate-950 border-slate-800">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xl font-semibold text-white">Global Trades</div>
          <div className="flex items-center gap-2 text-sm">
            <div className="text-gray-400">
              {sortedTrades.length} trades • Live updates every 1s
            </div>
            <div className={`w-2 h-2 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
          </div>
        </div>
        <ScrollArea className="h-[600px]">
          <table className="w-full text-sm bg-slate-950">
            <thead className="text-gray-400 border-b border-slate-800">
              <tr className="bg-slate-900/50">
                <th className="py-3 px-2 text-left font-medium text-xs uppercase tracking-wider">TIME</th>
                <th className="py-3 px-2 text-left font-medium text-xs uppercase tracking-wider">TYPE</th>
                <th className="py-3 px-2 text-left font-medium text-xs uppercase tracking-wider">PAIR</th>
                <th className="py-3 px-2 text-left font-medium text-xs uppercase tracking-wider">IN</th>
                <th className="py-3 px-2 text-left font-medium text-xs uppercase tracking-wider">OUT</th>
                <th className="py-3 px-2 text-left font-medium text-xs uppercase tracking-wider">PRICE</th>
                <th className="py-3 px-2 text-left font-medium text-xs uppercase tracking-wider">STATUS</th>
                <th className="py-3 px-2 text-left font-medium text-xs uppercase tracking-wider">DEX</th>
                <th className="py-3 px-2 text-left font-medium text-xs uppercase tracking-wider">MAKER</th>
                <th className="py-3 px-2 text-left font-medium text-xs uppercase tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 10 }).map((_, index) => (
                  <tr key={index} className="border-b border-slate-800 bg-slate-950">
                    <td className="py-3 px-2"><div className="w-12 h-4 bg-slate-700 rounded animate-pulse"></div></td>
                    <td className="py-3 px-2"><div className="w-16 h-6 bg-slate-700 rounded animate-pulse"></div></td>
                    <td className="py-3 px-2"><div className="w-32 h-6 bg-slate-700 rounded animate-pulse flex items-center gap-2">
                      <div className="w-6 h-6 bg-slate-600 rounded-full"></div>
                      <div className="w-16 h-4 bg-slate-600 rounded"></div>
                    </div></td>
                    <td className="py-3 px-2"><div className="w-20 h-4 bg-slate-700 rounded animate-pulse"></div></td>
                    <td className="py-3 px-2"><div className="w-20 h-4 bg-slate-700 rounded animate-pulse"></div></td>
                    <td className="py-3 px-2"><div className="w-16 h-4 bg-slate-700 rounded animate-pulse"></div></td>
                    <td className="py-3 px-2"><div className="w-20 h-6 bg-slate-700 rounded animate-pulse"></div></td>
                    <td className="py-3 px-2"><div className="w-16 h-6 bg-slate-700 rounded animate-pulse"></div></td>
                    <td className="py-3 px-2"><div className="w-20 h-4 bg-slate-700 rounded animate-pulse"></div></td>
                    <td className="py-3 px-2"><div className="w-24 h-6 bg-slate-700 rounded animate-pulse"></div></td>
                  </tr>
                ))
              ) : sortedTrades.length === 0 ? (
                // No data state
                <tr>
                  <td colSpan="10" className="py-12 text-center">
                    <div className="text-gray-400">
                      <div className="text-lg font-semibold mb-2">No Real Trade Data Available</div>
                      <div className="text-sm">
                        {apiStatus === 'error' ? 
                          'Failed to connect to Cardano DEX APIs' : 
                          'No live trades found from real DEX sources'
                        }
                      </div>
                      <div className="text-xs mt-2 text-gray-500">
                        Status: {getStatusText()}
                      </div>
                    </div>
                  </td>
                </tr>
              ) : sortedTrades.map((trade) => {
                // Parse the trading pair to get individual tokens (handle both ">" and "/" formats)
                const pair = trade.pair || '';
                let token1 = 'ADA', token2 = 'UNKNOWN';
                
                if (pair.includes('>')) {
                  const parts = pair.split('>').map(p => p.trim());
                  token1 = parts[0] || 'ADA';
                  token2 = parts[1] || 'UNKNOWN';
                } else if (pair.includes('/')) {
                  const parts = pair.split('/').map(p => p.trim());
                  token1 = parts[0] || 'ADA';
                  token2 = parts[1] || 'UNKNOWN';
                } else {
                  // Fallback to space-separated
                  const parts = pair.split(' ');
                  token1 = parts[0] || 'ADA';
                  token2 = parts[1] || 'UNKNOWN';
                }
                
                // Get token icons (using placeholder for now, can be replaced with real icons)
                const getTokenIcon = (symbol) => {
                  const iconMap = {
                    'ADA': '🪙', 'SNEK': '🐍', 'WORT': '🌿', 'MEH': '😐', 'FLOW': '💧', 
                    'CHAD': '💪', 'WETH': '💎', 'USDC': '💰', 'DJED': '🏛️', 'IUSD': '💵',
                    'HOSKY': '🐕', 'COPI': '🐧', 'NEWM': '🎵', 'AGIX': '🤖', 'MIN': '⛰️'
                  };
                  return iconMap[symbol] || '🔸';
                };

                return (
                  <tr key={trade.id} className="border-b border-slate-800 hover:bg-slate-900/30 transition-colors text-white bg-slate-950">
                    <td className="py-3 px-2 text-sm text-gray-300 font-mono">{getTimeAgo(trade.timestamp)}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        trade.type === "Buy" 
                          ? "bg-green-900/50 text-green-400 border border-green-600" 
                          : "bg-red-900/50 text-red-400 border border-red-600"
                      }`}>
                        {trade.type}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <span className="text-lg">{getTokenIcon(token1)}</span>
                          <span className="font-medium text-white">{token1}</span>
                        </div>
                        <span className="text-gray-400">{'>'}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-lg">{getTokenIcon(token2)}</span>
                          <span className="font-medium text-blue-400">{token2}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 font-mono text-sm">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        {trade.inAmount}
                      </div>
                    </td>
                    <td className="py-3 px-2 font-mono text-sm">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        {trade.outAmount}
                      </div>
                    </td>
                    <td className="py-3 px-2 font-mono text-sm text-yellow-400">{trade.price}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-1">
                        {trade.status === "Success" ? (
                          <>
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <span className="text-green-400 text-sm">Success</span>
                          </>
                        ) : (
                          <>
                            <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">◊</span>
                            </div>
                            <span className="text-yellow-400 text-sm">Pending</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-1">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {trade.dex ? trade.dex.charAt(0) : 'D'}
                          </span>
                        </div>
                        <span className="text-sm text-gray-300">{trade.dex || 'DEX'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <a 
                        href="#" 
                        className="font-mono text-sm text-blue-400 hover:text-blue-300 underline"
                        onClick={(e) => e.preventDefault()}
                      >
                        {trade.maker}
                      </a>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex gap-1">
                        <button
                          onClick={() => openTradeDetails(trade)}
                          className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center transition-colors"
                          title="View Trade Details"
                        >
                          <span className="text-blue-400 text-sm">📊</span>
                        </button>
                        <button
                          onClick={() => openRawData(trade)}
                          className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center transition-colors"
                          title="View Raw Data"
                        >
                          <span className="text-green-400 text-sm">🔍</span>
                        </button>
                        <button
                          className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center transition-colors"
                          title="External Link"
                        >
                          <span className="text-gray-400 text-sm">🔗</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </ScrollArea>
      </CardContent>

      {/* Trade Details Modal */}
      {showModal && selectedTrade && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-slate-800 p-6 rounded-lg max-w-4xl max-h-[80vh] overflow-y-auto border border-slate-600" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">
                {modalType === 'details' ? 'Trade Details' : 'Raw Trade Data'} - {selectedTrade.id}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white text-xl font-bold px-2"
              >
                ×
              </button>
            </div>

            {modalType === 'details' ? (
              <div className="space-y-4 text-white">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700 p-3 rounded">
                    <div className="text-sm text-gray-300">Trade ID</div>
                    <div className="font-mono text-sm">{selectedTrade.id}</div>
                  </div>
                  <div className="bg-slate-700 p-3 rounded">
                    <div className="text-sm text-gray-300">Timestamp</div>
                    <div className="font-mono text-sm">
                      {selectedTrade.timestamp ? new Date(selectedTrade.timestamp).toLocaleString() : 'N/A'}
                    </div>
                  </div>
                  <div className="bg-slate-700 p-3 rounded">
                    <div className="text-sm text-gray-300">Time Ago</div>
                    <div className="text-lg">{selectedTrade.timeAgo}</div>
                  </div>
                  <div className="bg-slate-700 p-3 rounded">
                    <div className="text-sm text-gray-300">Trade Type</div>
                    <Badge variant={selectedTrade.type === "Buy" ? "success" : "destructive"} className="text-lg">
                      {selectedTrade.type}
                    </Badge>
                  </div>
                  <div className="bg-slate-700 p-3 rounded">
                    <div className="text-sm text-gray-300">Trading Pair</div>
                    <div className="text-lg font-bold">{selectedTrade.pair}</div>
                  </div>
                  <div className="bg-slate-700 p-3 rounded">
                    <div className="text-sm text-gray-300">Status</div>
                    <Badge variant={selectedTrade.status === "Success" ? "success" : "secondary"}>
                      {selectedTrade.status}
                    </Badge>
                  </div>
                  <div className="bg-slate-700 p-3 rounded">
                    <div className="text-sm text-gray-300">Input Amount</div>
                    <div className="text-lg font-mono">{selectedTrade.inAmount}</div>
                  </div>
                  <div className="bg-slate-700 p-3 rounded">
                    <div className="text-sm text-gray-300">Output Amount</div>
                    <div className="text-lg font-mono">{selectedTrade.outAmount}</div>
                  </div>
                  <div className="bg-slate-700 p-3 rounded">
                    <div className="text-sm text-gray-300">Price</div>
                    <div className="text-lg font-mono text-yellow-400">{selectedTrade.price}</div>
                  </div>
                  <div className="bg-slate-700 p-3 rounded">
                    <div className="text-sm text-gray-300">DEX Platform</div>
                    <div className="text-lg">{selectedTrade.dex || 'Unknown'}</div>
                  </div>
                  <div className="bg-slate-700 p-3 rounded col-span-2">
                    <div className="text-sm text-gray-300">Maker Address</div>
                    <div className="text-lg font-mono break-all">{selectedTrade.maker}</div>
                  </div>
                </div>

                {selectedTrade.cellCount && (
                  <div className="bg-slate-700 p-3 rounded">
                    <div className="text-sm text-gray-300">Data Quality</div>
                    <div className="text-lg">
                      <span className="text-green-400">{selectedTrade.cellCount}</span> data cells scraped
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4 text-white">
                <div className="bg-slate-700 p-4 rounded">
                  <h4 className="text-lg font-bold mb-3 text-yellow-400">Complete Trade Object</h4>
                  <pre className="text-xs overflow-x-auto bg-slate-900 p-3 rounded font-mono">
{JSON.stringify(selectedTrade, null, 2)}
                  </pre>
                </div>

                {selectedTrade.rawCells && (
                  <div className="bg-slate-700 p-4 rounded">
                    <h4 className="text-lg font-bold mb-3 text-green-400">Raw Scraped Data Cells</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedTrade.rawCells.map((cell, index) => (
                        <div key={index} className="bg-slate-900 p-2 rounded flex">
                          <span className="text-gray-400 w-8 text-right mr-3">{index}:</span>
                          <span className="font-mono text-green-300">{cell || '(empty)'}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-sm text-gray-400">
                      Total cells: {selectedTrade.rawCells.length}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setModalType('details')}
                className={`px-4 py-2 rounded transition-colors ${
                  modalType === 'details' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-600 text-gray-300 hover:bg-slate-500'
                }`}
              >
                Trade Details
              </button>
              <button
                onClick={() => setModalType('raw')}
                className={`px-4 py-2 rounded transition-colors ${
                  modalType === 'raw' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-slate-600 text-gray-300 hover:bg-slate-500'
                }`}
              >
                Raw Data
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors ml-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}