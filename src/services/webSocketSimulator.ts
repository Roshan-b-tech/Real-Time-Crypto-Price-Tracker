import { Dispatch } from '@reduxjs/toolkit';
import { updateCrypto } from '../store/cryptoSlice';
import { CryptoCurrency, PriceChange, WebSocketMessage } from '../types';
import { mockCryptoData } from '../data/mockData';

let wsInterval: number | null = null;

// Simulates a random price change for a cryptocurrency
const simulatePriceChange = (currentPrice: number): { newPrice: number; direction: 'up' | 'down' } => {
  const changePercent = (Math.random() * 2 - 1) * 0.5; // Random change between -0.5% and 0.5%
  const changeAmount = currentPrice * (changePercent / 100);
  const newPrice = Math.max(0.01, currentPrice + changeAmount); // Ensure price doesn't go below 0.01
  
  return {
    newPrice: parseFloat(newPrice.toFixed(8)),
    direction: changeAmount >= 0 ? 'up' : 'down'
  };
};

// Create a simulated price change object
const createPriceChange = (
  oldPrice: number, 
  newPrice: number, 
  direction: 'up' | 'down'
): PriceChange => {
  const changeValue = newPrice - oldPrice;
  const changePercent = (changeValue / oldPrice) * 100;
  
  return {
    percentage: Number(changePercent.toFixed(2)),
    value: Number(changeValue.toFixed(8)),
    direction
  };
};

// Simulates a WebSocket message with random updates
const simulateWebSocketMessage = (): WebSocketMessage => {
  // Randomly select a cryptocurrency to update
  const cryptoIndex = Math.floor(Math.random() * mockCryptoData.length);
  const crypto = mockCryptoData[cryptoIndex];
  
  // Simulate price change
  const { newPrice, direction } = simulatePriceChange(crypto.price);
  
  // Create updated price changes
  const newPriceChange1h = createPriceChange(
    crypto.price / (1 + crypto.priceChange1h.percentage / 100),
    newPrice,
    direction
  );
  
  const newPriceChange24h = createPriceChange(
    crypto.price / (1 + crypto.priceChange24h.percentage / 100),
    newPrice,
    direction
  );
  
  // Randomly change volume (0.1% to 2% change)
  const volumeChangePercent = (Math.random() * 1.9 + 0.1);
  const volumeDirection = Math.random() > 0.5 ? 'up' : 'down';
  const volumeChangeMultiplier = volumeDirection === 'up' ? 1 + volumeChangePercent/100 : 1 - volumeChangePercent/100;
  const newVolume = crypto.volume24h * volumeChangeMultiplier;
  
  // Create a deep copy of the chart data with the new price point
  const newDataPoint = [...crypto.chartData7d.datasets[0].data.slice(1), newPrice];
  const chartData = {
    ...crypto.chartData7d,
    datasets: [{
      ...crypto.chartData7d.datasets[0],
      data: newDataPoint
    }]
  };
  
  // Return the update message
  return {
    type: 'price_update',
    data: {
      id: crypto.id,
      price: newPrice,
      priceChange1h: newPriceChange1h,
      priceChange24h: newPriceChange24h,
      volume24h: newVolume,
      chartData7d: chartData
    }
  };
};

// Start the WebSocket simulation
export const startWebSocketSimulation = (dispatch: Dispatch): void => {
  if (wsInterval !== null) {
    clearInterval(wsInterval);
  }
  
  // Dispatch initial data
  
  // Set up interval for simulated updates
  wsInterval = setInterval(() => {
    const message = simulateWebSocketMessage();
    dispatch(updateCrypto(message.data));
  }, 2000) as unknown as number;
};

// Stop the WebSocket simulation
export const stopWebSocketSimulation = (): void => {
  if (wsInterval !== null) {
    clearInterval(wsInterval);
    wsInterval = null;
  }
};