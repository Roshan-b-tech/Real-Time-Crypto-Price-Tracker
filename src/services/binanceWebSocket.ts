import { Dispatch } from '@reduxjs/toolkit';
import { updateCrypto } from '../store/cryptoSlice';
import { WebSocketMessage, CryptoCurrency, PriceChange } from '../types';

const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws';
const TRACKED_SYMBOLS = [
  'BTCUSDT',
  'ETHUSDT',
  'BNBUSDT',
  'SOLUSDT',
  'XRPUSDT'
];

interface WebSocketState {
  ws: WebSocket | null;
  isConnecting: boolean;
  reconnectAttempts: number;
  lastPrices: { [key: string]: number };
  reconnectTimeout: NodeJS.Timeout | null;
  pingInterval: NodeJS.Timeout | null;
  lastPingTime: number;
}

const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 5000; // 5 seconds
const PING_INTERVAL = 30000; // 30 seconds
const PING_TIMEOUT = 10000; // 10 seconds

let wsState: WebSocketState = {
  ws: null,
  isConnecting: false,
  reconnectAttempts: 0,
  lastPrices: {},
  reconnectTimeout: null,
  pingInterval: null,
  lastPingTime: 0
};

const calculatePriceChange = (oldPrice: number, newPrice: number): PriceChange => {
  const changeValue = newPrice - oldPrice;
  const changePercent = (changeValue / oldPrice) * 100;
  
  return {
    percentage: Number(changePercent.toFixed(2)),
    value: Number(changeValue.toFixed(8)),
    direction: changeValue > 0 ? 'up' : changeValue < 0 ? 'down' : 'neutral'
  };
};

const cleanupWebSocket = () => {
  if (wsState.pingInterval) {
    clearInterval(wsState.pingInterval);
    wsState.pingInterval = null;
  }

  if (wsState.reconnectTimeout) {
    clearTimeout(wsState.reconnectTimeout);
    wsState.reconnectTimeout = null;
  }

  if (wsState.ws) {
    wsState.ws.onopen = null;
    wsState.ws.onmessage = null;
    wsState.ws.onerror = null;
    wsState.ws.onclose = null;
    wsState.ws.close();
    wsState.ws = null;
  }
};

const subscribeToTickers = () => {
  if (wsState.ws?.readyState === WebSocket.OPEN) {
    const subscribeMessage = {
      method: 'SUBSCRIBE',
      params: TRACKED_SYMBOLS.map(symbol => `${symbol.toLowerCase()}@ticker`),
      id: 1
    };
    wsState.ws.send(JSON.stringify(subscribeMessage));
  }
};

const setupPingInterval = (dispatch: Dispatch) => {
  if (wsState.pingInterval) {
    clearInterval(wsState.pingInterval);
  }

  wsState.pingInterval = setInterval(() => {
    if (wsState.ws?.readyState === WebSocket.OPEN) {
      const now = Date.now();
      if (now - wsState.lastPingTime > PING_TIMEOUT) {
        console.log('Ping timeout, reconnecting...');
        cleanupWebSocket();
        connectWebSocket(dispatch);
        return;
      }
      wsState.ws.send(JSON.stringify({ method: 'ping' }));
      wsState.lastPingTime = now;
    }
  }, PING_INTERVAL);
};

const connectWebSocket = (dispatch: Dispatch): void => {
  if (wsState.ws?.readyState === WebSocket.OPEN || wsState.isConnecting) {
    return;
  }

  wsState.isConnecting = true;
  cleanupWebSocket();

  try {
    wsState.ws = new WebSocket(BINANCE_WS_URL);

    wsState.ws.onopen = () => {
      console.log('Connected to Binance WebSocket');
      wsState.reconnectAttempts = 0;
      wsState.isConnecting = false;
      wsState.lastPingTime = Date.now();
      subscribeToTickers();
      setupPingInterval(dispatch);
    };

    wsState.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        // Handle pong response
        if (data.pong) {
          wsState.lastPingTime = Date.now();
          return;
        }
        
        // Handle ticker data
        if (data.e === '24hrTicker') {
          const symbol = data.s;
          const price = parseFloat(data.c);
          const priceChange24h = parseFloat(data.p);
          const priceChangePercent24h = parseFloat(data.P);
          const volume24h = parseFloat(data.v) * price;
          const lastPrice = wsState.lastPrices[symbol] || price;
          
          wsState.lastPrices[symbol] = price;

          const priceChange1h = calculatePriceChange(lastPrice, price);
          const priceChange24hObj: PriceChange = {
            percentage: Number(priceChangePercent24h.toFixed(2)),
            value: Number(priceChange24h.toFixed(8)),
            direction: priceChange24h >= 0 ? 'up' : 'down' as const
          };
          
          const cryptoId = symbol.toLowerCase().replace('usdt', '');
          
          const message: WebSocketMessage = {
            type: 'price_update',
            data: {
              id: cryptoId,
              price,
              priceChange1h,
              priceChange24h: priceChange24hObj,
              volume24h,
              lastUpdated: Date.now()
            }
          };
          
          dispatch(updateCrypto(message.data));
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    };

    wsState.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      wsState.isConnecting = false;
    };

    wsState.ws.onclose = () => {
      console.log('WebSocket connection closed');
      wsState.isConnecting = false;
      
      if (wsState.reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        wsState.reconnectAttempts++;
        console.log(`Attempting to reconnect (${wsState.reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`);
        wsState.reconnectTimeout = setTimeout(() => {
          connectWebSocket(dispatch);
        }, RECONNECT_DELAY);
      } else {
        console.error('Max reconnection attempts reached. Please refresh the page.');
      }
    };
  } catch (error) {
    console.error('Error creating WebSocket connection:', error);
    wsState.isConnecting = false;
  }
};

export const startBinanceWebSocket = (dispatch: Dispatch): void => {
  connectWebSocket(dispatch);
};

export const stopBinanceWebSocket = (): void => {
  cleanupWebSocket();
  wsState = {
    ws: null,
    isConnecting: false,
    reconnectAttempts: 0,
    lastPrices: {},
    reconnectTimeout: null,
    pingInterval: null,
    lastPingTime: 0
  };
}; 