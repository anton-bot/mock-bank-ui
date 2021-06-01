import { lang } from '../../languages/lang';

export function validateAccount(accountId: string): string | undefined {
  if (isValidAccount(accountId)) {
    return;
  }

  return lang().form.from.invalid;
}

export function isValidAccount(accountId: string): boolean {
  return Boolean(accountId);
}
