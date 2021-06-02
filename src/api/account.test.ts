import { Currency } from '../types/Currency';
import { getAccounts, transferBetweenAccounts } from './account';
import { createMockBackend } from './mocks/server';

describe('Account API', () => {
  it('must retrieve a list of accounts from API', async () => {
    const server = createMockBackend();

    const accounts = await getAccounts();
    expect(accounts.length).toBe(4);

    server.shutdown();
  });

  it('must make a transfer between accounts', async () => {
    const server = createMockBackend();

    const accounts = await getAccounts();
    expect(accounts.length).toBe(4);

    const usdAccountIds = accounts
      .filter((a) => a.currency === Currency.USD)
      .map((a) => a.accountId);
    await transferBetweenAccounts(usdAccountIds[0], usdAccountIds[1], 1000000);

    const accounts2 = await getAccounts();
    expect(accounts2.length).toBe(4);
    expect(accounts2.some((a) => a.accountId === usdAccountIds[0] && a.balance === 0)).toBe(true);
    expect(accounts2.some((a) => a.accountId === usdAccountIds[1] && a.balance === 2000000)).toBe(
      true,
    );

    server.shutdown();
  });
});
