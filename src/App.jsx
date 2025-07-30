import React, { useState } from 'react'
import LandingPage from './components/LandingPage'
import Header from './components/Header'
import DexStats from './components/DexStats'
import DexTradeViewerMock from './components/DexTradeViewerMock'

function App() {
  const [showApp, setShowApp] = useState(false);

  if (!showApp) {
    return <LandingPage onEnterApp={() => setShowApp(true)} />;
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <Header onBackToLanding={() => setShowApp(false)} />
        <DexStats />
        <DexTradeViewerMock />
      </div>
    </div>
  )
}

export default App