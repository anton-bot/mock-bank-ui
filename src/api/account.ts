import axios from 'axios';
import { getUsernameFromLocalStorage } from '../functions/getUsernameFromLocalStorage';
import { BankAccount } from '../types/BankAccount';

export async function getAccounts(): Promise<BankAccount[]> {
  const response = await axios.get('/account', {
    headers: {
      token: getUsernameFromLocalStorage(),
    },
  });
  return response.data;
}

export async function transferBetweenAccounts(
  from: string,
  to: string,
  amount: number,
): Promise<void> {
  await axios.post(
    '/transfer',
    {
      from,
      to,
      amount,
    },
    {
      headers: {
        token: getUsernameFromLocalStorage(),
      },
    },
  );
}
