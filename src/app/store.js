import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import tradeTileReducer from '../features/tradeTile/tradeTileSlice';
import tradeSignalsReducer from '../features/tradeSignals/tradeSignalsSlice';
import statsReducer from '../features/stats/statsSlice';

export const store = configureStore({
  reducer: {
    tradeTile: tradeTileReducer,
    tradeSignals: tradeSignalsReducer,
    stats: statsReducer,
  },
  middleware: [thunkMiddleware],
});

