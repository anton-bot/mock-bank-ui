import { Currency } from '../types/Currency';
import Amount from 'currency.js';

export const formatCurrency = (balance: number, currency: Currency): string => {
  const symbol = currencySymbol[currency];
  return Amount(balance, { fromCents: true }).format({ symbol });
};

const currencySymbol: Record<Currency, string> = {
  [Currency.HKD]: 'HK$',
  [Currency.USD]: '$',
};
