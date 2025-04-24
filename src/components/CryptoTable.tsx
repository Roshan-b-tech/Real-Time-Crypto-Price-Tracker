import React from 'react';
import { useSelector } from 'react-redux';
import { Info } from 'lucide-react';
import { selectFilteredCryptos } from '../store/cryptoSlice';
import CryptoRow from './CryptoRow';
import SortControls from './SortControls';

const CryptoTable: React.FC = () => {
  const cryptocurrencies = useSelector(selectFilteredCryptos);

  return (
    <div className="w-full">
      <SortControls />
      <div className="overflow-x-auto rounded-lg border border-slate-700">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-700 text-left">
              <th className="w-16 py-3 px-2 text-sm font-medium text-gray-400">#</th>
              <th className="w-48 py-3 px-2 text-sm font-medium text-gray-400">Name</th>
              <th className="w-32 py-3 px-2 text-sm font-medium text-gray-400">Price</th>
              <th className="w-24 py-3 px-2 text-sm font-medium text-gray-400">1h %</th>
              <th className="w-24 py-3 px-2 text-sm font-medium text-gray-400">24h %</th>
              <th className="w-24 py-3 px-2 text-sm font-medium text-gray-400">7d %</th>
              <th className="w-40 py-3 px-2 text-sm font-medium text-gray-400 hidden lg:table-cell">
                <div className="flex items-center">
                  Market Cap
                  <div className="group relative">
                    <Info size={14} className="info-icon" />
                    <div className="tooltip w-[200px]">
                      Market Cap = Current Price x Circulating Supply
                    </div>
                  </div>
                </div>
              </th>
              <th className="w-40 py-3 px-2 text-sm font-medium text-gray-400 hidden lg:table-cell">
                <div className="flex items-center">
                  Volume(24h)
                  <div className="group relative">
                    <Info size={14} className="info-icon" />
                    <div className="tooltip">
                      Volume of trading in the last 24 hours
                    </div>
                  </div>
                </div>
              </th>
              <th className="w-48 py-3 px-2 text-sm font-medium text-gray-400 hidden xl:table-cell">
                <div className="flex items-center">
                  Circulating Supply
                  <div className="group relative">
                    <Info size={14} className="info-icon" />
                    <div className="tooltip">
                      Amount of coins currently in circulation
                    </div>
                  </div>
                </div>
              </th>
              <th className="w-40 py-3 px-2 text-sm font-medium text-gray-400 hidden xl:table-cell">Last 7 Days</th>
            </tr>
          </thead>
          <tbody>
            {cryptocurrencies.map((crypto) => (
              <CryptoRow key={crypto.id} crypto={crypto} />
            ))}
          </tbody>
        </table>
      </div>
      
      {cryptocurrencies.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No cryptocurrencies found. Try adjusting your search or sort options.
        </div>
      )}
    </div>
  );
};

export default CryptoTable;