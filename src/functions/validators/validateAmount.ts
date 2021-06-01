import Amount from 'currency.js';
import { lang } from '../../languages/lang';

export function validateAmount(amount: string, balance: number | undefined): string | undefined {
  if (balance === undefined) {
    return undefined;
  }

  if (!isValidNumber(amount)) {
    return lang().form.amount.invalid;
  }

  if (!hasEnoughBalance(amount, balance)) {
    return lang().form.amount.insufficientFunds;
  }

  return undefined;
}

export function isValidAmount(amount: string, balance: number | undefined): boolean {
  return isValidNumber(amount) && hasEnoughBalance(amount, balance);
}

function isValidNumber(amount: string) {
  const notANumber = Number.isNaN(Number(amount));
  if (notANumber) {
    return false;
  }

  const hasTooManyDecimalPlaces = amount.includes('.') && amount.split('.')[1].length > 2;
  if (hasTooManyDecimalPlaces) {
    return false;
  }

  return true;
}

function hasEnoughBalance(amount: string, balance: number | undefined) {
  if (balance === undefined) {
    return false;
  }

  const balanceAmount = Amount(balance, { fromCents: true }).value;

  return Number(amount) <= balanceAmount;
}
