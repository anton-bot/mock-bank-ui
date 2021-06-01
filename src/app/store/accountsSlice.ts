import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAccounts } from '../../api/account';
import { AccountTransaction } from '../../types/AccountTransaction';
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
      action.payload.forEach((a) => a.transactions.sort(byDatetimeDesc));
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

const byDatetimeDesc = (a: AccountTransaction, b: AccountTransaction): number =>
  b.datetime.localeCompare(a.datetime);

export const { setAccounts } = accountsSlice.actions;

export const selectAccounts = (state: RootState) => state.accounts.accounts;

export const getAccountById = (accountId: string) => (state: RootState) =>
  state.accounts.accounts?.find((a) => a.accountId === accountId);

export default accountsSlice.reducer;
