import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAccounts } from '../../api/account';
import { BankAccount } from '../../types/BankAccount';
import { RootState } from '../store';

type AccountsState = {
  accounts: BankAccount[] | undefined;
};

const initialState: AccountsState = {
  accounts: undefined,
};

export const fetchAccounts = createAsyncThunk('accounts/getAccounts', getAccounts);

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    setAccounts: (state, action: PayloadAction<BankAccount[]>) => {
      state.accounts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAccounts.fulfilled, (state, action) => {
      state.accounts = action.payload.sort(byCurrencyAndAccountNumber);
    });
  },
});

const byCurrencyAndAccountNumber = (a: BankAccount, b: BankAccount): number => {
  if (a.currency < b.currency) {
    return -1;
  }

  if (a.currency > b.currency) {
    return 1;
  }

  return a.accountNumber.localeCompare(b.accountNumber);
};

export const { setAccounts } = accountsSlice.actions;

export const selectAccounts = (state: RootState) => state.accounts.accounts;

export default accountsSlice.reducer;
