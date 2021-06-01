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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAccounts.fulfilled, (state, action) => {
      const accounts = action.payload.map((a) => ({
        ...a,
        transactions: a.transactions.sort(byDatetimeDesc),
      }));
      state.accounts = accounts.sort(byCurrencyAndAccountNumber);
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

export const selectAccounts = (state: RootState) => state.accounts.accounts;

export const selectAccountById = (accountId: string) => (state: RootState) =>
  state.accounts.accounts?.find((a) => a.accountId === accountId);

export default accountsSlice.reducer;
