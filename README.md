# DEXY - Cardano DEX Aggregator

The most capital efficient trading protocol on Cardano. DEXY aggregates liquidity across all major decentralized exchanges to maximize returns and optimize profits.

## Features

- 🔄 **Real-time trade monitoring** across multiple Cardano DEXes
- 📊 **Live statistics dashboard** with market insights
- 🔗 **Real Cardano wallet integration** (Nami, Eternl, Lace, Flint, Typhon)
- 🎨 **Professional dark theme** optimized interface
- 📱 **Responsive design** with mobile support
- ⚡ **High-performance data updates** with live streaming
- 🔥 **Trending tokens tracker** with search and filters
- 💧 **Liquidity pools analytics** with APY tracking
- 📈 **Advanced analytics dashboard** with market insights
- 🎯 **Multi-tab navigation** (Trending, Trades, Pools, Analytics)

## Supported DEXes

- Minswap
- WingRiders  
- Spectrum

## Supported Tokens

- ADA (Cardano)
- DJED (Stablecoin)
- ROOKIE
- GATOR
- BA.AD
- WORT
- SNEK
- SU.OR

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shelby69699/SNEKFN.git
   cd SNEKFN
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: TailwindCSS, ShadCN UI
- **Wallet Integration**: @meshsdk/core, Cardano dApp Connector API
- **Mock Data**: Faker.js for demo purposes
- **UI Components**: Professional ShadCN UI components
- **Real-time Updates**: Live data streaming simulation

## Project Structure

```
src/
├── components/
│   ├── ui/           # ShadCN UI components
│   ├── Header.jsx    # App header with branding
│   ├── DexStats.jsx  # Statistics dashboard
│   └── DexTradeViewerMock.jsx  # Main trade viewer
├── lib/
│   └── utils.js      # Utility functions
├── App.jsx           # Main app component
├── main.jsx          # App entry point
└── index.css         # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## License

MIT License

## Roadmap

- [ ] Integration with real Cardano DEX APIs
- [ ] Advanced filtering and sorting
- [ ] Price charts and analytics
- [ ] Portfolio tracking
- [ ] Mobile app
- [ ] WebSocket real-time updates