import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import themeSlice from './slices/themeSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
