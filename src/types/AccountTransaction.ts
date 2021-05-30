import { AccountTransactionType } from './AccountTransactionType';
import * as Amount from 'currency.js';

export type AccountTransaction = {
  transactionId: string;
  type: AccountTransactionType;
  datetime: string;
  description: string;
  amount: number;
};
