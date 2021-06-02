import { Currency } from '../types/Currency';
import { formatCurrency } from './formatCurrency';

describe('Format currency', () => {
  it('must format an amount with currency', () => {
    expect(formatCurrency(12345, Currency.USD)).toBe('$123.45');
    expect(formatCurrency(1234567890, Currency.HKD)).toBe('HK$12,345,678.90');
    expect(formatCurrency(-2345, Currency.HKD, 'with-currency')).toBe('-HK$23.45');
  });

  it('must format the amount without currency', () => {
    expect(formatCurrency(1234567890, Currency.HKD, 'number-only')).toBe('12,345,678.90');
  });
});
