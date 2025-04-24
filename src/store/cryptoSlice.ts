import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { CryptoCurrency } from '../types';
import { initialCryptoData } from '../data/initialData';

type SortOption = 'rank' | 'gainers24h' | 'losers24h' | 'volume' | 'marketCap';

interface CryptoState {
  cryptocurrencies: { [key: string]: CryptoCurrency };
  favoriteIds: string[];
  searchTerm: string;
  isLoading: boolean;
  sortBy: SortOption;
}

// Load initial state from localStorage
const loadState = (): Partial<CryptoState> => {
  try {
    const serializedState = localStorage.getItem('cryptoState');
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return {};
  }
};

// Save state to localStorage
const saveState = (state: Partial<CryptoState>) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cryptoState', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};

const initialState: CryptoState = {
  cryptocurrencies: initialCryptoData.reduce((acc, crypto) => {
    if (crypto.id) {
      acc[crypto.id] = {
        ...crypto,
        price: 0,
        priceChange1h: { percentage: 0, value: 0, direction: 'neutral' },
        priceChange24h: { percentage: 0, value: 0, direction: 'neutral' },
        priceChange7d: { percentage: 0, value: 0, direction: 'neutral' },
        marketCap: 0,
        volume24h: 0,
        lastUpdated: Date.now(),
      } as CryptoCurrency;
    }
    return acc;
  }, {} as { [key: string]: CryptoCurrency }),
  favoriteIds: [],
  searchTerm: '',
  isLoading: true,
  sortBy: 'rank',
  ...loadState() // Merge with saved state
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateCrypto: (state, action: PayloadAction<Partial<CryptoCurrency> & { id: string }>) => {
      const { id, ...updates } = action.payload;
      if (state.cryptocurrencies[id]) {
        state.cryptocurrencies[id] = {
          ...state.cryptocurrencies[id],
          ...updates,
          lastUpdated: Date.now()
        };

        // Calculate market cap if price is updated
        if (updates.price) {
          state.cryptocurrencies[id].marketCap = 
            updates.price * state.cryptocurrencies[id].circulatingSupply;
        }

        // Update chart data if price is updated
        if (updates.price) {
          const chartData = state.cryptocurrencies[id].chartData7d;
          chartData.datasets[0].data = [...chartData.datasets[0].data.slice(1), updates.price];
        }
      }
      state.isLoading = false;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.favoriteIds.indexOf(id);
      if (index === -1) {
        state.favoriteIds.push(id);
      } else {
        state.favoriteIds.splice(index, 1);
      }
      // Save favorites to localStorage
      saveState({ favoriteIds: state.favoriteIds });
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload.toLowerCase();
    },
    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
      // Save sort option to localStorage
      saveState({ sortBy: state.sortBy });
    }
  }
});

// Selectors
const selectCryptoState = (state: { crypto: CryptoState }) => state.crypto;

export const selectCryptos = createSelector(
  [selectCryptoState],
  (cryptoState) => Object.values(cryptoState.cryptocurrencies)
);

export const selectFilteredCryptos = createSelector(
  [
    selectCryptos,
    (state: { crypto: CryptoState }) => state.crypto.searchTerm,
    (state: { crypto: CryptoState }) => state.crypto.sortBy
  ],
  (cryptos, searchTerm, sortBy) => {
    let filteredCryptos = cryptos;
    
    // Filter by search term
    if (searchTerm) {
      filteredCryptos = filteredCryptos.filter(crypto => 
        crypto.name.toLowerCase().includes(searchTerm) ||
        crypto.symbol.toLowerCase().includes(searchTerm)
      );
    }

    // Sort according to selected option
    switch (sortBy) {
      case 'gainers24h':
        return [...filteredCryptos].sort((a, b) => b.priceChange24h.percentage - a.priceChange24h.percentage);
      case 'losers24h':
        return [...filteredCryptos].sort((a, b) => a.priceChange24h.percentage - b.priceChange24h.percentage);
      case 'volume':
        return [...filteredCryptos].sort((a, b) => b.volume24h - a.volume24h);
      case 'marketCap':
        return [...filteredCryptos].sort((a, b) => b.marketCap - a.marketCap);
      default:
        return [...filteredCryptos].sort((a, b) => a.rank - b.rank);
    }
  }
);

export const selectFavoriteIds = createSelector(
  [selectCryptoState],
  (cryptoState) => cryptoState.favoriteIds
);

export const selectIsLoading = createSelector(
  [selectCryptoState],
  (cryptoState) => cryptoState.isLoading
);

export const selectSortOption = createSelector(
  [selectCryptoState],
  (cryptoState) => cryptoState.sortBy
);

export const { 
  updateCrypto, 
  toggleFavorite, 
  setSearchTerm, 
  setSortOption
} = cryptoSlice.actions;

export default cryptoSlice.reducer;