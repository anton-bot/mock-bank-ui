import { formatBankAccountNumber } from './formatBankAccountNumber';

describe('Format account number', () => {
  it('must format account number with dashes', () => {
    expect(formatBankAccountNumber('1234567890')).toBe('123-4567-890');
  });

  it('must not change anything for unexpected account number', () => {
    const INVALID_ACCOUNTS = ['1234567', 'ABCDEFG123', '123-4567-890'];
    INVALID_ACCOUNTS.forEach((account) => expect(formatBankAccountNumber(account)).toBe(account));
  });
});
