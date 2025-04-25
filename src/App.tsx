import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowUp } from 'lucide-react';
import { startBinanceWebSocket, stopBinanceWebSocket } from './services/binanceWebSocket';
import { RootState } from './store';
import { selectIsLoading } from './store/cryptoSlice';
import Header from './components/Header';
import CryptoTable from './components/CryptoTable';
import Loader from './components/Loader';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => selectIsLoading(state));
  const [showBackToTop, setShowBackToTop] = React.useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Start the Binance WebSocket connection
    startBinanceWebSocket(dispatch);

    // Set up scroll listener for back-to-top button
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    // Simulate initial loading time (you can remove this in production)
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);

    // Clean up when component unmounts
    return () => {
      stopBinanceWebSocket();
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [dispatch]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isInitialLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <Header />
      <main className="w-full max-w-7xl mx-auto px-4 py-8">
        {isLoading ? (
          <Loader />
        ) : (
          <CryptoTable />
        )}
      </main>
      
      {showBackToTop && (
        <button 
          className="back-to-top" 
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default App;