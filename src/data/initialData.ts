import { CryptoCurrency } from '../types';

// Initial data for cryptocurrencies (static information)
export const initialCryptoData: Partial<CryptoCurrency>[] = [
  {
    id: 'btc',
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    logo: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
    circulatingSupply: 19.85e6,
    maxSupply: 21e6,
    chartData7d: {
      labels: Array.from({ length: 7 }, () => ''),
      datasets: [{ data: Array(7).fill(0) }]
    }
  },
  {
    id: 'eth',
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    circulatingSupply: 120.71e6,
    maxSupply: null,
    chartData7d: {
      labels: Array.from({ length: 7 }, () => ''),
      datasets: [{ data: Array(7).fill(0) }]
    }
  },
  {
    id: 'bnb',
    rank: 3,
    name: 'BNB',
    symbol: 'BNB',
    logo: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
    circulatingSupply: 140.89e6,
    maxSupply: 200e6,
    chartData7d: {
      labels: Array.from({ length: 7 }, () => ''),
      datasets: [{ data: Array(7).fill(0) }]
    }
  },
  {
    id: 'sol',
    rank: 4,
    name: 'Solana',
    symbol: 'SOL',
    logo: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
    circulatingSupply: 517.31e6,
    maxSupply: null,
    chartData7d: {
      labels: Array.from({ length: 7 }, () => ''),
      datasets: [{ data: Array(7).fill(0) }]
    }
  },
  {
    id: 'xrp',
    rank: 5,
    name: 'XRP',
    symbol: 'XRP',
    logo: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png',
    circulatingSupply: 58.39e9,
    maxSupply: 100e9,
    chartData7d: {
      labels: Array.from({ length: 7 }, () => ''),
      datasets: [{ data: Array(7).fill(0) }]
    }
  }
]; 