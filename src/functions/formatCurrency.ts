import { Currency } from '../types/Currency';
import Amount from 'currency.js';

export const formatCurrency = (
  balance: number,
  currency: Currency,
  format: 'with-currency' | 'number-only' = 'with-currency',
): string => {
  const symbol = format === 'with-currency' ? currencySymbol[currency] : '';
  return Amount(balance, { fromCents: true }).format({ symbol });
};

const currencySymbol: Record<Currency, string> = {
  [Currency.HKD]: 'HK$',
  [Currency.USD]: '$',
};
