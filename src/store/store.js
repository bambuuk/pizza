import { configureStore } from '@reduxjs/toolkit';
import food from './foodSlice';

const store = configureStore({
  reducer: { food },
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;