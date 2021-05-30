import { Currency } from './Currency';
import { AccountTransaction } from './AccountTransaction';

export type BankAccount = {
  accountId: string;
  accountNumber: string;
  currency: Currency;
  balance: number;
  transactions: AccountTransaction[];
};
