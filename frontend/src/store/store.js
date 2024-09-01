    // store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../pages/aSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer ,
    counter2: counterReducer ,
  },
});
