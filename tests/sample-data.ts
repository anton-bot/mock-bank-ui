import { BankAccount } from '../src/types/BankAccount';
import { Currency } from '../src/types/Currency';

export const VALID_HKD_ACCOUNT: BankAccount = {
  accountId: 'a8cdfe06-4dae-4c64-9376-5e1fa135e33c',
  accountNumber: '120-8911-909',
  currency: Currency.HKD,
  balance: 550000,
  transactions: [],
};
