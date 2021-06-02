import { VALID_ACCOUNT_NUMBER } from '../../constants';
import { generateFakeEmail } from '../../functions/generateFakeEmail';
import { Currency } from '../../types/Currency';
import {
  generateRandomAccountNumber,
  getAccounts,
  getTransactionDescription,
  initializeNewUser,
  initializeStorage,
  transfer,
} from './fakebank';

describe('Mock banking backend based on localStorage', () => {
  it('must generate a 10-digit bank account number', () => {
    const account = generateRandomAccountNumber();
    expect(account).toMatch(VALID_ACCOUNT_NUMBER);
  });

  it('must generate a transfer transaction description', () => {
    const description = getTransactionDescription('1234567890', '3339999111');
    expect(description).toBe('Transfer from 123-4567-890 to 333-9999-111');
  });

  it('must initialize empty new storage', () => {
    const storage = initializeStorage();
    expect(storage).toEqual({});
  });

  const user = generateFakeEmail();
  it('must create accounts for a new user', () => {
    const accounts = initializeNewUser(user);
    expect(accounts.length).toBe(4);

    accounts.forEach((account) => {
      expect(account.accountId.length).toBe(36);
      expect(account.accountNumber).toMatch(VALID_ACCOUNT_NUMBER);
      expect(account.balance).toBe(1000000);
      expect(Object.values(Currency)).toContain(account.currency);
      expect(account.transactions.length).toBe(1);
    });
  });

  it('must retrieve accounts from storage', () => {
    const accounts = getAccounts(user);
    expect(accounts.length).toBe(4);
  });

  it('must transfer money from one account to another', () => {
    const accounts = getAccounts(user);
    const currency = Currency.HKD;
    const firstAccountId = accounts.find((a) => a.currency === currency)?.accountId;
    const secondAccountId = accounts.find(
      (a) => a.currency === currency && a.accountId !== firstAccountId,
    )?.accountId;
    if (!firstAccountId || !secondAccountId) {
      throw new Error(
        `Can't find an account for ${currency}: ${firstAccountId} / ${secondAccountId}`,
      );
    }

    transfer(user, firstAccountId, secondAccountId, 30);
    const accounts1 = getAccounts(user);
    expect(accounts1.find((a) => a.accountId === firstAccountId)?.balance).toBe(999970);
    expect(accounts1.find((a) => a.accountId === secondAccountId)?.balance).toBe(1000030);

    transfer(user, secondAccountId, firstAccountId, 1000030);
    const accounts2 = getAccounts(user);
    expect(accounts2.find((a) => a.accountId === firstAccountId)?.balance).toBe(2000000);
    expect(accounts2.find((a) => a.accountId === secondAccountId)?.balance).toBe(0);

    expect(() => transfer(user, firstAccountId, secondAccountId, 2000001)).toThrow();
    expect(() => transfer(user, secondAccountId, firstAccountId, 30)).toThrow();
  });
});
