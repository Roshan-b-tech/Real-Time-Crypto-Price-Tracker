export interface PriceChange {
  percentage: number;
  value: number;
  direction: 'up' | 'down' | 'neutral';
}

export interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
  }[];
}

export interface CryptoCurrency {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  priceChange1h: PriceChange;
  priceChange24h: PriceChange;
  priceChange7d: PriceChange;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  chartData7d: ChartData;
  lastUpdated: number;
}

export interface WebSocketMessage {
  type: 'price_update' | 'market_update' | 'full_update';
  data: Partial<CryptoCurrency> & { id: string };
}