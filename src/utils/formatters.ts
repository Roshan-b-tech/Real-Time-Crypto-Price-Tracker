import numeral from 'numeral';

// Format price with proper decimal places based on value
export const formatPrice = (price: number): string => {
  if (price >= 1000) {
    return numeral(price).format('$0,0.00');
  } else if (price >= 1) {
    return numeral(price).format('$0,0.00');
  } else if (price >= 0.01) {
    return numeral(price).format('$0,0.000');
  } else {
    return numeral(price).format('$0,0.00000000');
  }
};

// Format percentage change with colors
export const formatPercentage = (value: number): string => {
  return numeral(value).format('+0.00') + '%';
};

// Format large numbers (market cap, volume, supply)
export const formatLargeNumber = (value: number): string => {
  return numeral(value).format('$0.00a').toUpperCase();
};

// Format supply numbers
export const formatSupply = (value: number, symbol: string): string => {
  if (value >= 1e9) {
    return `${numeral(value / 1e9).format('0.00')}B ${symbol}`;
  } else if (value >= 1e6) {
    return `${numeral(value / 1e6).format('0.00')}M ${symbol}`;
  } else if (value >= 1e3) {
    return `${numeral(value / 1e3).format('0.00')}K ${symbol}`;
  }
  return `${numeral(value).format('0,0')} ${symbol}`;
};

// Get color class based on price change direction
export const getPriceChangeColorClass = (direction: 'up' | 'down' | 'neutral'): string => {
  if (direction === 'up') return 'text-success';
  if (direction === 'down') return 'text-danger';
  return 'text-gray-400';
};