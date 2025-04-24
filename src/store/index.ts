import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './cryptoSlice';

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;