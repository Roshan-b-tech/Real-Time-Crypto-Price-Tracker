import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Star } from 'lucide-react';
import classNames from 'classnames';
import { toggleFavorite, selectFavoriteIds } from '../store/cryptoSlice';
import { CryptoCurrency } from '../types';
import { formatPrice, formatPercentage, formatLargeNumber, formatSupply, getPriceChangeColorClass } from '../utils/formatters';
import PriceChange from './PriceChange';
import MiniChart from './MiniChart';

interface CryptoRowProps {
  crypto: CryptoCurrency;
}

const CryptoRow: React.FC<CryptoRowProps> = ({ crypto }) => {
  const dispatch = useDispatch();
  const favoriteIds = useSelector(selectFavoriteIds);
  const isFavorite = favoriteIds.includes(crypto.id);
  const prevPriceRef = useRef(crypto.price);
  const [pulseClass, setPulseClass] = useState<string>('');
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    // Check if price has changed and apply pulse animation
    if (crypto.price !== prevPriceRef.current) {
      const direction = crypto.price > prevPriceRef.current ? 'pulse-green' : 'pulse-red';
      setPulseClass(direction);
      
      // Remove animation class after it completes
      const timer = setTimeout(() => {
        setPulseClass('');
      }, 1500);
      
      prevPriceRef.current = crypto.price;
      
      return () => clearTimeout(timer);
    }
  }, [crypto.price]);
  
  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(crypto.id));
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <tr className={classNames('coin-row', pulseClass)}>
      <td className="py-4 px-2">
        <div className="flex items-center gap-2">
          <button 
            onClick={handleToggleFavorite}
            className={classNames('star-button', { 'active': isFavorite })}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Star size={16} fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <span>{crypto.rank}</span>
        </div>
      </td>
      
      <td className="py-4 px-2">
        <div className="flex items-center">
          {!imageError ? (
            <img 
              src={crypto.logo} 
              alt={crypto.name} 
              className="w-6 h-6 mr-2"
              onError={handleImageError}
            />
          ) : (
            <div className="w-6 h-6 mr-2 bg-slate-700 rounded-full flex items-center justify-center text-xs font-medium">
              {crypto.symbol.slice(0, 2)}
            </div>
          )}
          <div>
            <div className="font-medium">{crypto.name}</div>
            <div className="text-xs text-gray-400">{crypto.symbol}</div>
          </div>
        </div>
      </td>
      
      <td className="py-4 px-2 font-medium">
        {formatPrice(crypto.price)}
      </td>
      
      <td className="py-4 px-2">
        <PriceChange change={crypto.priceChange1h} />
      </td>
      
      <td className="py-4 px-2">
        <PriceChange change={crypto.priceChange24h} />
      </td>
      
      <td className="py-4 px-2">
        <PriceChange change={crypto.priceChange7d} />
      </td>
      
      <td className="py-4 px-2 hidden lg:table-cell">
        {formatLargeNumber(crypto.marketCap)}
      </td>
      
      <td className="py-4 px-2 hidden lg:table-cell">
        {formatLargeNumber(crypto.volume24h)}
        <div className="text-xs text-gray-400">
          {formatSupply(crypto.volume24h / crypto.price, crypto.symbol)}
        </div>
      </td>
      
      <td className="py-4 px-2 hidden xl:table-cell">
        {formatSupply(crypto.circulatingSupply, crypto.symbol)}
        {crypto.maxSupply && (
          <div className="mt-1 h-1.5 bg-gray-700 rounded-full w-full overflow-hidden">
            <div 
              className="h-full bg-primary-light rounded-full" 
              style={{ width: `${(crypto.circulatingSupply / crypto.maxSupply) * 100}%` }}
            ></div>
          </div>
        )}
      </td>
      
      <td className="py-4 px-2 hidden xl:table-cell">
        <MiniChart data={crypto.chartData7d} priceChange7d={crypto.priceChange7d} />
      </td>
    </tr>
  );
};

export default CryptoRow;