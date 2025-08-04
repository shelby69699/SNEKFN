import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Mock data
const mockPools = {
  data: [
    {
      identifier: "lovelace.ada-pool-1",
      tokenA: "",
      tokenB: {
        policyId: "533bb94a8850ee3ccbe483106489399112b74c905342cb1792a797a0",
        nameHex: "494e4459",
        ticker: "INDY",
        name: "Indigo DAO Token"
      },
      dex: "Minswap"
    },
    {
      identifier: "lovelace.snek-pool-1", 
      tokenA: "",
      tokenB: {
        policyId: "snek-policy-id",
        nameHex: "534e454b",
        ticker: "SNEK",
        name: "Snek Token"
      },
      dex: "SundaeSwap"
    }
  ]
};

const mockSwaps = {
  data: [
    {
      swapInToken: {
        policyId: "",
        nameHex: "",
        ticker: "ADA",
        name: "Cardano"
      },
      swapOutToken: {
        policyId: "533bb94a8850ee3ccbe483106489399112b74c905342cb1792a797a0",
        nameHex: "494e4459",
        ticker: "INDY",
        name: "Indigo DAO Token"
      },
      swapInAmount: 1000000000,
      minReceive: 100000000,
      senderPubKeyHash: "addr1q8...",
      slot: Math.floor(Date.now() / 1000),
      txHash: "9d034453a9e21fcb6e14dd7c50587e43d1b5220bc2ad081cc6409b05740507e8",
      outputIndex: 0
    },
    {
      swapInToken: {
        policyId: "",
        nameHex: "",
        ticker: "ADA",
        name: "Cardano"
      },
      swapOutToken: {
        policyId: "snek-policy-id",
        nameHex: "534e454b",
        ticker: "SNEK",
        name: "Snek Token"
      },
      swapInAmount: 500000000,
      minReceive: 50000000,
      senderPubKeyHash: "addr1q9...",
      slot: Math.floor(Date.now() / 1000) - 60,
      txHash: "8c1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd",
      outputIndex: 1
    }
  ]
};

const mockAssets = {
  data: [
    {
      policyId: "",
      nameHex: "",
      ticker: "ADA",
      name: "Cardano",
      decimals: 6
    },
    {
      policyId: "533bb94a8850ee3ccbe483106489399112b74c905342cb1792a797a0",
      nameHex: "494e4459",
      ticker: "INDY",
      name: "Indigo DAO Token",
      decimals: 6
    },
    {
      policyId: "snek-policy-id",
      nameHex: "534e454b",
      ticker: "SNEK",
      name: "Snek Token",
      decimals: 6
    }
  ]
};

// API endpoints
app.get('/api/ping', (req, res) => {
  res.json({ status: true });
});

app.get('/liquidity-pools', (req, res) => {
  res.json(mockPools);
});

app.get('/liquidity-pools/:identifier/swaps', (req, res) => {
  res.json(mockSwaps);
});

app.get('/assets', (req, res) => {
  res.json(mockAssets);
});

app.get('/assets/:asset/price', (req, res) => {
  const asset = req.params.asset;
  if (asset.includes('INDY')) {
    res.json({ price: 0.45 });
  } else if (asset.includes('SNEK')) {
    res.json({ price: 0.00089 });
  } else {
    res.json({ price: 0.45 }); // ADA
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Mock Iris API running on http://localhost:${PORT}`);
  console.log(`📊 Serving mock DEX data for testing`);
  console.log(`🔗 DEXY backend will connect to this mock API`);
}); 