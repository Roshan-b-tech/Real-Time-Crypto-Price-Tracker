import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Info } from 'lucide-react';
import { setSearchTerm } from '../store/cryptoSlice';
import { RootState } from '../store';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.crypto.searchTerm);
  const [inputValue, setInputValue] = useState(searchTerm);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    dispatch(setSearchTerm(value));
  };

  return (
    <header className="bg-slate-800 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">
              Crypto<span className="text-primary-light">Tracker</span>
            </h1>
          </div>
          
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-slate-700 text-white w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
              placeholder="Search cryptocurrency..."
              value={inputValue}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center text-sm text-gray-300">
              <span>Cryptocurrencies</span>
              <div className="group relative">
                <Info size={16} className="info-icon ml-1" />
                <div className="tooltip">
                  Showing real-time prices and market data
                </div>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-300">
              <span>Market Cap</span>
              <div className="group relative">
                <Info size={16} className="info-icon ml-1" />
                <div className="tooltip">
                  Total value of all coins in circulation
                </div>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-300">
              <span>Volume (24h)</span>
              <div className="group relative">
                <Info size={16} className="info-icon ml-1" />
                <div className="tooltip">
                  Total trading volume in the last 24 hours
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;