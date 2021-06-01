import { BankAccount } from '../../types/BankAccount';
import { Currency } from '../../types/Currency';
import { MockDataStorage } from '../../types/MockDataStorage';
import { v4 as uuid } from 'uuid';
import { AccountTransactionType } from '../../types/AccountTransactionType';
import { formatBankAccountNumber } from '../../functions/formatBankAccountNumber';

const LOCAL_STORAGE_KEY = 'fakebank';
const DEFAULT_STORAGE: MockDataStorage = {};
const DEFAULT_ACCOUNTS = [Currency.HKD, Currency.HKD, Currency.USD, Currency.USD];
const DEFAULT_ACCOUNT_BALANCE = 1000000;

export const getStorage = () => {
  const existingStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
  return existingStorage ? JSON.parse(existingStorage) : initializeStorage();
};

export const initializeStorage = () => {
  saveStorage(DEFAULT_STORAGE);
  const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!storage) {
    throw new Error(`Failed to initialize localStorage for the mock API`);
  }

  return JSON.parse(storage);
};

export const getAccounts = (user: string): BankAccount[] =>
  getStorage()[user] ?? initializeNewUser(user);

export const initializeNewUser = (user: string): BankAccount[] =>
  DEFAULT_ACCOUNTS.map(createBankAccount(user));

const createBankAccount = (user: string) => (currency: Currency) => {
  const account: BankAccount = {
    currency,
    accountId: uuid(),
    accountNumber: generateRandomAccountNumber(),
    balance: DEFAULT_ACCOUNT_BALANCE,
    transactions: [
      {
        amount: DEFAULT_ACCOUNT_BALANCE,
        transactionId: uuid(),
        type: AccountTransactionType.credit,
        datetime: new Date().toISOString(),
        description: 'Initial balance',
      },
    ],
  };
  saveAccountState(user, account);
  return account;
};

export const generateRandomAccountNumber = (): string =>
  String(Math.round(Math.random() * 10000000000)).padStart(10, '0');

const saveAccountState = (user: string, account: BankAccount) => {
  const storage = getStorage();
  storage[user] = storage[user] || [];
  storage[user] = storage[user].filter((a: BankAccount) => a.accountId !== account.accountId);
  storage[user].push(account);
  saveStorage(storage);
};

const saveStorage = (storage: MockDataStorage) =>
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));

export const transfer = (
  user: string,
  fromAccountId: string,
  toAccountId: string,
  amount: number,
) => {
  const accounts = getAccounts(user);
  const fromAccount = accounts.find(byAccountId(fromAccountId));
  const toAccount = accounts.find(byAccountId(toAccountId));

  if (!fromAccount) {
    throw new Error(`Invalid from account ${fromAccountId} when transferring money`);
  }

  if (!toAccount) {
    throw new Error(`Invalid to account ${toAccountId} when transferring money`);
  }

  const modifiedAccounts = createTransferTransactions(fromAccount, toAccount, amount);
  saveAccountState(user, modifiedAccounts.from);
  saveAccountState(user, modifiedAccounts.to);
};

const byAccountId = (accountId: string) => (a: BankAccount) => a.accountId === accountId;

const createTransferTransactions = (from: BankAccount, to: BankAccount, amount: number) => {
  if (from.currency !== to.currency) {
    throw new Error(
      `Currency doesn't match for accounts ${from.accountNumber} and ${to.accountNumber}`,
    );
  }

  if (from.balance < amount) {
    throw new Error(`Insufficient balance in account ${from.accountNumber}`);
  }

  const datetime = new Date().toISOString();

  from.transactions.push({
    transactionId: uuid(),
    type: AccountTransactionType.debit,
    description: getTransactionDescription(from.accountNumber, to.accountNumber),
    amount,
    datetime,
  });
  from.balance -= amount;

  to.transactions.push({
    transactionId: uuid(),
    type: AccountTransactionType.credit,
    description: getTransactionDescription(from.accountNumber, to.accountNumber),
    datetime,
    amount,
  });
  to.balance += amount;

  return { from, to };
};

export const getTransactionDescription = (from: string, to: string) =>
  `Transfer from ${formatBankAccountNumber(from)} to ${formatBankAccountNumber(to)}`;
