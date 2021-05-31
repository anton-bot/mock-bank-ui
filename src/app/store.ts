import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import accountsReducer from './store/accountsSlice';

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
