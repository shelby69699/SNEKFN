# DEXY - Cardano DEX Aggregator

The most capital efficient trading protocol on Cardano. DEXY aggregates liquidity across all major decentralized exchanges to maximize returns and optimize profits.

## Features

- 🔄 Real-time trade monitoring across multiple Cardano DEXes
- 📊 Live statistics dashboard
- 🎨 Dark theme optimized interface
- 📱 Responsive design
- ⚡ High-performance data updates

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
- **Mock Data**: Faker.js
- **Future**: Lucid Cardano integration for real data

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