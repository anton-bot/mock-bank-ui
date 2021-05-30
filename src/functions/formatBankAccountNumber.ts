export function formatBankAccountNumber(accountNumber: string) {
  return accountNumber.replace(/^(\d{3})(\d{4})(\d{3})$/, '$1-$2-$3');
}
