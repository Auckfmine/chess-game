// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { gameReducer } from './game/reducers';

export const store = configureStore({
  reducer: gameReducer
});