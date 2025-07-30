import React from 'react'
import Header from './components/Header'
import DexStats from './components/DexStats'
import DexTradeViewerMock from './components/DexTradeViewerMock'

function App() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <Header />
        <DexStats />
        <DexTradeViewerMock />
      </div>
    </div>
  )
}

export default App