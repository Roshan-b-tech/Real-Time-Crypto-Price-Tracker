import cryptoReducer, {
  updateCrypto,
  toggleFavorite,
  setSearchTerm,
  setSortOption,
  selectCryptos,
  selectFilteredCryptos,
  selectFavoriteIds,
  selectIsLoading,
  selectSortOption
} from './cryptoSlice';
import { initialCryptoData } from '../data/initialData';
import { CryptoCurrency, PriceChange, ChartData } from '../types';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('cryptoSlice', () => {
  const initialState = {
    cryptocurrencies: initialCryptoData.reduce((acc, crypto) => {
      if (crypto.id && crypto.name && crypto.symbol && crypto.rank && crypto.logo) {
        acc[crypto.id] = {
          id: crypto.id,
          name: crypto.name,
          symbol: crypto.symbol,
          rank: crypto.rank,
          logo: crypto.logo,
          price: 0,
          priceChange1h: { percentage: 0, value: 0, direction: 'neutral' as const },
          priceChange24h: { percentage: 0, value: 0, direction: 'neutral' as const },
          priceChange7d: { percentage: 0, value: 0, direction: 'neutral' as const },
          marketCap: 0,
          volume24h: 0,
          circulatingSupply: crypto.circulatingSupply || 0,
          maxSupply: crypto.maxSupply || null,
          chartData7d: crypto.chartData7d || { labels: [], datasets: [{ data: [] }] },
          lastUpdated: Date.now(),
        };
      }
      return acc;
    }, {} as { [key: string]: CryptoCurrency }),
    favoriteIds: [],
    searchTerm: '',
    isLoading: true,
    sortBy: 'rank' as const
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('reducers', () => {
    it('should handle updateCrypto', () => {
      const cryptoId = 'btc';
      const update: Partial<CryptoCurrency> & { id: string } = {
        id: cryptoId,
        price: 50000,
        priceChange24h: { percentage: 5, value: 2500, direction: 'up' as const }
      };

      const newState = cryptoReducer(initialState, updateCrypto(update));

      expect(newState.cryptocurrencies[cryptoId].price).toBe(50000);
      expect(newState.cryptocurrencies[cryptoId].priceChange24h.percentage).toBe(5);
      expect(newState.isLoading).toBe(false);
    });

    it('should handle toggleFavorite', () => {
      const cryptoId = 'btc';
      
      // Add to favorites
      let newState = cryptoReducer(initialState, toggleFavorite(cryptoId));
      expect(newState.favoriteIds).toContain(cryptoId);
      expect(mockLocalStorage.setItem).toHaveBeenCalled();

      // Remove from favorites
      newState = cryptoReducer(newState, toggleFavorite(cryptoId));
      expect(newState.favoriteIds).not.toContain(cryptoId);
    });

    it('should handle setSearchTerm', () => {
      const searchTerm = 'bitcoin';
      const newState = cryptoReducer(initialState, setSearchTerm(searchTerm));
      expect(newState.searchTerm).toBe(searchTerm.toLowerCase());
    });

    it('should handle setSortOption', () => {
      const sortOption = 'gainers24h' as const;
      const newState = cryptoReducer(initialState, setSortOption(sortOption));
      expect(newState.sortBy).toBe(sortOption);
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('selectors', () => {
    const state = {
      crypto: {
        ...initialState,
        cryptocurrencies: {
          btc: {
            id: 'btc',
            name: 'Bitcoin',
            symbol: 'BTC',
            rank: 1,
            price: 50000,
            priceChange24h: { percentage: 5, value: 2500, direction: 'up' as const },
            volume24h: 1000000,
            marketCap: 1000000000,
            priceChange1h: { percentage: 1, value: 500, direction: 'up' as const },
            priceChange7d: { percentage: 10, value: 5000, direction: 'up' as const },
            circulatingSupply: 19000000,
            maxSupply: 21000000,
            chartData7d: {
              labels: [],
              datasets: [{ data: [] }]
            },
            lastUpdated: Date.now(),
            logo: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png'
          },
          eth: {
            id: 'eth',
            name: 'Ethereum',
            symbol: 'ETH',
            rank: 2,
            price: 3000,
            priceChange24h: { percentage: -2, value: -60, direction: 'down' as const },
            volume24h: 500000,
            marketCap: 500000000,
            priceChange1h: { percentage: -1, value: -30, direction: 'down' as const },
            priceChange7d: { percentage: -5, value: -150, direction: 'down' as const },
            circulatingSupply: 120000000,
            maxSupply: null,
            chartData7d: {
              labels: [],
              datasets: [{ data: [] }]
            },
            lastUpdated: Date.now(),
            logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
          }
        },
        favoriteIds: ['btc'],
        searchTerm: '',
        sortBy: 'rank' as const
      }
    };

    it('should select all cryptocurrencies', () => {
      const result = selectCryptos(state);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('btc');
      expect(result[1].id).toBe('eth');
    });

    it('should filter cryptocurrencies by search term', () => {
      const stateWithSearch = {
        ...state,
        crypto: {
          ...state.crypto,
          searchTerm: 'bit'
        }
      };
      const result = selectFilteredCryptos(stateWithSearch);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('btc');
    });

    it('should sort cryptocurrencies by gainers', () => {
      const stateWithGainersSort = {
        ...state,
        crypto: {
          ...state.crypto,
          sortBy: 'gainers24h' as const
        }
      };
      const result = selectFilteredCryptos(stateWithGainersSort);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('btc');
      expect(result[1].id).toBe('eth');
    });

    it('should sort cryptocurrencies by losers', () => {
      const stateWithLosersSort = {
        ...state,
        crypto: {
          ...state.crypto,
          sortBy: 'losers24h' as const
        }
      };
      const result = selectFilteredCryptos(stateWithLosersSort);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('eth');
      expect(result[1].id).toBe('btc');
    });

    it('should select favorite IDs', () => {
      const result = selectFavoriteIds(state);
      expect(result).toContain('btc');
      expect(result).not.toContain('eth');
    });

    it('should select loading state', () => {
      const result = selectIsLoading(state);
      expect(result).toBe(true);
    });

    it('should select sort option', () => {
      const result = selectSortOption(state);
      expect(result).toBe('rank');
    });
  });
}); 