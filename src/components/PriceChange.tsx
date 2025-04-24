import React from 'react';
import { ChevronUp, ChevronDown, Minus } from 'lucide-react';
import { PriceChange as PriceChangeType } from '../types';
import { formatPercentage, getPriceChangeColorClass } from '../utils/formatters';

interface PriceChangeProps {
  change: PriceChangeType;
}

const PriceChange: React.FC<PriceChangeProps> = ({ change }) => {
  const colorClass = getPriceChangeColorClass(change.direction);
  
  return (
    <div className={`flex items-center ${colorClass}`}>
      {change.direction === 'up' && <ChevronUp size={14} />}
      {change.direction === 'down' && <ChevronDown size={14} />}
      {change.direction === 'neutral' && <Minus size={14} />}
      <span>{formatPercentage(change.percentage)}</span>
    </div>
  );
};

export default PriceChange;