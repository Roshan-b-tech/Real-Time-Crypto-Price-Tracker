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

## Tech Stack

### Frontend

- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and development server
- **Jest** - Testing framework
- **WebSocket** - Real-time data updates

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

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

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

## Development

### Code Style

The project uses ESLint and Prettier for code formatting. To format your code:

```bash
npm run format
# or
yarn format
```

### Adding New Features

1. Create new components in the `src/components` directory
2. Add new state management in `src/store/cryptoSlice.ts`
3. Update types in `src/types.ts` if needed
4. Add tests in the corresponding `.test.ts` files

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
