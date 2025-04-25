# Real-Time Crypto Price Tracker

A modern, responsive web application for tracking cryptocurrency prices in real-time using Binance WebSocket API.

## Demo

![Crypto Tracker Demo](demo.gif)

## Features

- Real-time cryptocurrency price updates
- Interactive price charts
- Favorites system with local storage persistence
- Search and filter functionality
- Multiple sorting options (rank, gainers, losers, volume, market cap)
- Responsive design with mobile support
- Dark mode UI
- Real-time price alerts
- Historical price data visualization

## Tech Stack

### Frontend

- **React** (v18.2.0) - UI library
- **TypeScript** (v5.2.2) - Type-safe JavaScript
- **Redux Toolkit** (v2.2.1) - State management
- **Tailwind CSS** (v3.4.1) - Utility-first CSS framework
- **Vite** (v5.1.4) - Build tool and development server
- **Jest** (v29.7.0) - Testing framework
- **Chart.js** (v4.4.1) - Interactive charts
- **WebSocket** - Real-time data updates
- **date-fns** (v3.3.1) - Date manipulation
- **numeral** (v2.0.6) - Number formatting

### Architecture

The application follows a modern React architecture with the following structure:

```
src/
├── components/         # React components
│   ├── CryptoTable.tsx    # Main table component
│   ├── CryptoRow.tsx      # Individual crypto row
│   ├── Header.tsx         # Application header
│   ├── MiniChart.tsx      # Price chart component
│   ├── SortControls.tsx   # Sorting controls
│   ├── FilterControls.tsx # Filtering controls
│   └── Loader.tsx         # Loading state
├── store/              # Redux store
│   ├── cryptoSlice.ts     # Cryptocurrency state management
│   └── index.ts           # Store configuration
├── services/           # External services
│   └── binanceWebSocket.ts # Binance WebSocket integration
├── utils/              # Utility functions
│   └── formatters.ts      # Number and date formatting
├── types.ts            # TypeScript type definitions
└── App.tsx             # Root component
```

### State Management

The application uses Redux Toolkit for state management with the following features:

- Real-time price updates
- Favorites persistence
- Search and filter state
- Sorting options
- Loading states
- Price alert management

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/crypto-tracker.git
cd crypto-tracker
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

### Running Tests

```bash
npm test
# or
yarn test
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run format` - Format code with Prettier
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## API Integration

The application uses the Binance WebSocket API for real-time price updates. The integration is handled in `src/services/binanceWebSocket.ts`. The WebSocket connection:

- Establishes a connection to Binance's WebSocket API
- Subscribes to real-time price updates
- Handles reconnection on connection loss
- Manages multiple currency pairs
- Implements error handling and logging

## Troubleshooting

### Common Issues

1. **WebSocket Connection Issues**

   - Check your internet connection
   - Verify that Binance API is accessible
   - Check browser console for error messages

2. **Build Errors**

   - Clear node_modules and reinstall dependencies
   - Update Node.js to the latest LTS version
   - Check for conflicting dependencies

3. **TypeScript Errors**
   - Run `npm run type-check` to identify issues
   - Update type definitions if needed
   - Check for missing type declarations

### Development Tips

- Use the browser's developer tools to monitor WebSocket connections
- Enable source maps for better debugging
- Use React Developer Tools for component inspection
- Monitor Redux state changes with Redux DevTools

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
