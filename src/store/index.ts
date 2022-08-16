import { configureStore } from '@reduxjs/toolkit';
import wordsReducer from './wordsSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    words: wordsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
