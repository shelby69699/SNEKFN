import { useState } from 'react'
import LandingPage from './components/LandingPage'
import Navigation from './components/Navigation'
import DexStats from './components/DexStats'
import DexTradeViewerMock from './components/DexTradeViewerMock'
import TrendingTokens from './components/TrendingTokens'
import PoolsSection from './components/PoolsSection'
import AnalyticsDashboard from './components/AnalyticsDashboard'
import MyOrders from './components/MyOrders'

import DexyBackground from './components/DexyBackground'

function App() {
  const [showApp, setShowApp] = useState(false);
  const [activeTab, setActiveTab] = useState('trades');

  if (!showApp) {
    return <LandingPage onEnterApp={() => {
      console.log('🎯 onEnterApp called, setting showApp to true');
      setShowApp(true);
    }} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'trades':
        return (
          <div className="space-y-6">
            <DexStats />
            <DexTradeViewerMock />
          </div>
        );
      case 'orders':
        return <MyOrders />;
      case 'analytics':
        return <AnalyticsDashboard />;
      default:
        return (
          <div className="space-y-6">
            <DexStats />
            <DexTradeViewerMock />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-950/30 to-slate-900 p-4">
      {/* Your beautiful DEXY geometric background */}
      <DexyBackground />
      
      <div className="max-w-7xl mx-auto relative z-0">
        <Navigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          onBackToLanding={() => setShowApp(false)} 
        />
        {renderContent()}
      </div>
    </div>
  )
}

export default App