import { CryptoCurrency } from '../types';

// Generate chart data
const generateChartData = (trend: 'up' | 'down' | 'volatile', baseValue: number) => {
  const labels = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });
  
  let data: number[] = [];
  
  if (trend === 'up') {
    data = Array.from({ length: 7 }, (_, i) => 
      baseValue * (1 + (0.02 * i) + (Math.random() * 0.01))
    );
  } else if (trend === 'down') {
    data = Array.from({ length: 7 }, (_, i) => 
      baseValue * (1 - (0.01 * i) + (Math.random() * 0.005))
    );
  } else {
    data = Array.from({ length: 7 }, (_, i) => 
      baseValue * (1 + (Math.random() * 0.04 - 0.02))
    );
  }
  
  return {
    labels,
    datasets: [{ data }]
  };
};

// Mock cryptocurrency data
export const mockCryptoData: CryptoCurrency[] = [
  {
    id: 'bitcoin',
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    logo: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
    price: 93759.48,
    priceChange1h: { percentage: 0.43, value: 95.12, direction: 'up' },
    priceChange24h: { percentage: 0.93, value: 923.45, direction: 'up' },
    priceChange7d: { percentage: 11.11, value: 9123.45, direction: 'up' },
    marketCap: 1861618902186,
    volume24h: 43874950947,
    circulatingSupply: 19.85e6,
    maxSupply: 21e6,
    chartData7d: generateChartData('up', 93759.48),
    lastUpdated: Date.now(),
  },
  {
    id: 'ethereum',
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    price: 1802.46,
    priceChange1h: { percentage: 0.60, value: 10.21, direction: 'up' },
    priceChange24h: { percentage: 3.21, value: 56.23, direction: 'up' },
    priceChange7d: { percentage: 13.68, value: 210.45, direction: 'up' },
    marketCap: 217581279327,
    volume24h: 23547469307,
    circulatingSupply: 120.71e6,
    maxSupply: null,
    chartData7d: generateChartData('up', 1802.46),
    lastUpdated: Date.now(),
  },
  {
    id: 'tether',
    rank: 3,
    name: 'Tether',
    symbol: 'USDT',
    logo: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
    price: 1.00,
    priceChange1h: { percentage: 0.00, value: 0, direction: 'down' },
    priceChange24h: { percentage: 0.00, value: 0, direction: 'down' },
    priceChange7d: { percentage: 0.04, value: 0.0004, direction: 'up' },
    marketCap: 145320022085,
    volume24h: 92288882007,
    circulatingSupply: 145.27e9,
    maxSupply: null,
    chartData7d: generateChartData('volatile', 1.00),
    lastUpdated: Date.now(),
  },
  {
    id: 'xrp',
    rank: 4,
    name: 'XRP',
    symbol: 'XRP',
    logo: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png',
    price: 2.22,
    priceChange1h: { percentage: 0.46, value: 0.01, direction: 'up' },
    priceChange24h: { percentage: 0.54, value: 0.012, direction: 'up' },
    priceChange7d: { percentage: 6.18, value: 0.13, direction: 'up' },
    marketCap: 130073814966,
    volume24h: 5131481491,
    circulatingSupply: 58.39e9,
    maxSupply: 100e9,
    chartData7d: generateChartData('up', 2.22),
    lastUpdated: Date.now(),
  },
  {
    id: 'bnb',
    rank: 5,
    name: 'BNB',
    symbol: 'BNB',
    logo: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
    price: 606.65,
    priceChange1h: { percentage: 0.09, value: 0.54, direction: 'up' },
    priceChange24h: { percentage: 1.20, value: 7.35, direction: 'down' },
    priceChange7d: { percentage: 3.73, value: 21.84, direction: 'up' },
    marketCap: 85471956947,
    volume24h: 1874281784,
    circulatingSupply: 140.89e6,
    maxSupply: 200e6,
    chartData7d: generateChartData('volatile', 606.65),
    lastUpdated: Date.now(),
  },
  {
    id: 'solana',
    rank: 6,
    name: 'Solana',
    symbol: 'SOL',
    logo: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
    price: 151.51,
    priceChange1h: { percentage: 0.53, value: 0.8, direction: 'up' },
    priceChange24h: { percentage: 1.26, value: 1.88, direction: 'up' },
    priceChange7d: { percentage: 14.74, value: 19.38, direction: 'up' },
    marketCap: 78381958631,
    volume24h: 4881674486,
    circulatingSupply: 517.31e6,
    maxSupply: null,
    chartData7d: generateChartData('up', 151.51),
    lastUpdated: Date.now(),
  }
];