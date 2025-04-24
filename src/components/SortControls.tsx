import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { setSortOption, selectSortOption } from '../store/cryptoSlice';

const sortOptions = [
  { value: 'rank', label: 'Market Rank', icon: <BarChart3 size={16} /> },
  { value: 'gainers24h', label: 'Top Gainers', icon: <TrendingUp size={16} /> },
  { value: 'losers24h', label: 'Top Losers', icon: <TrendingDown size={16} /> },
  { value: 'volume', label: 'Volume 24h', icon: <DollarSign size={16} /> },
  { value: 'marketCap', label: 'Market Cap', icon: <BarChart3 size={16} /> },
] as const;

const SortControls: React.FC = () => {
  const dispatch = useDispatch();
  const currentSort = useSelector(selectSortOption);

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {sortOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => dispatch(setSortOption(option.value))}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${currentSort === option.value
              ? 'bg-primary text-white'
              : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SortControls; 