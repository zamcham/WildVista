import { configureStore } from '@reduxjs/toolkit';
import parksReducer from './features/parksSlice';

const store = configureStore({
  reducer: {
    parkData: parksReducer,
  },
});

export default store;
