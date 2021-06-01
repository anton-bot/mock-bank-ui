import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAccountById, selectAccounts } from '../../app/store/accountsSlice';
import { FormField } from '../../components/FormField/FormField';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { formatBankAccountNumber } from '../../functions/formatBankAccountNumber';
import { formatCurrency } from '../../functions/formatCurrency';
import { isValidAccount, validateAccount } from '../../functions/validators/validateAccount';
import { isValidAmount, validateAmount } from '../../functions/validators/validateAmount';
import { lang } from '../../languages/lang';
import { BankAccount } from '../../types/BankAccount';
import { Button } from '../../components/Button/Button';
import './TransferBetweenAccounts.scss';
import { transferBetweenAccounts } from '../../api/account';
import Amount from 'currency.js';
import { navigate } from '../../functions/navigate';
import { useHistory } from 'react-router';
import { Page } from '../../types/Page';

export const TransferBetweenAccounts = () => {
  const text = lang().transfer;
  const form = lang().form;

  const [fromAccountId, setFromAccountId] = useState('');
  const [toAccountId, setToAccountId] = useState('');
  const [amount, setAmount] = useState('');

  const [fromAccountTouched, setFromAccountTouched] = useState(false);
  const [toAccountTouched, setToAccountTouched] = useState(false);
  const [amountTouched, setAmountTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  const fromAccount = useSelector(selectAccountById(fromAccountId));
  const accounts = useSelector(selectAccounts);
  const history = useHistory();

  const initiateTransfer = async () => {
    setFromAccountTouched(true);
    setToAccountTouched(true);
    setAmountTouched(true);

    if (!isFormValid(fromAccountId, toAccountId, amount, fromAccount?.balance || 0)) {
      return;
    }

    setLoading(true);
    await transferBetweenAccounts(fromAccountId, toAccountId, Amount(amount).intValue);
    navigate(history, Page.transferCompleted);
  };

  return (
    <div className="TransferBetweenAccounts">
      <PageTitle>{text.title}</PageTitle>
      <div className="form">
        <FormField
          label={form.from.label}
          touched={fromAccountTouched}
          error={validateAccount(fromAccountId)}
        >
          <select
            onChange={(e) => {
              setFromAccountId(e.currentTarget.value);
              setToAccountId('');
            }}
            onBlur={() => setFromAccountTouched(true)}
            value={fromAccountId}
          >
            {getFromAccountOptions(accounts)}
          </select>
        </FormField>
        <FormField
          label={form.to.label}
          touched={toAccountTouched}
          error={validateAccount(toAccountId)}
        >
          <select
            disabled={!fromAccount}
            onChange={(e) => setToAccountId(e.currentTarget.value)}
            onBlur={() => setToAccountTouched(true)}
            value={toAccountId}
          >
            {getToAccountOptions(accounts, fromAccount)}
          </select>
        </FormField>
        <FormField
          label={form.amount.label}
          touched={amountTouched}
          error={validateAmount(amount, fromAccount?.balance)}
        >
          <input
            onChange={(e) => setAmount(stripNonNumberChars(e.currentTarget.value))}
            onBlur={() => setAmountTouched(true)}
            value={amount}
          />
        </FormField>
        <Button onClick={initiateTransfer} disabled={loading}>
          {text.buttons.transfer}
        </Button>
      </div>
    </div>
  );
};

function getFromAccountOptions(accounts: BankAccount[] | undefined) {
  return getOptionsFromAccounts(accounts || []);
}

function getToAccountOptions(
  accounts: BankAccount[] | undefined,
  fromAccount: BankAccount | undefined,
) {
  return fromAccount
    ? getOptionsFromAccounts(
        accounts?.filter(
          (a) => a.currency === fromAccount.currency && a.accountId !== fromAccount.accountId,
        ) || [],
      )
    : [];
}

function getOptionsFromAccounts(accounts: BankAccount[]) {
  const options = accounts.map((a) => (
    <option key={a.accountId} value={a.accountId}>
      {formatBankAccountNumber(a.accountNumber)} | {a.currency} |{' '}
      {formatCurrency(a.balance, a.currency, 'number-only')}
    </option>
  ));

  return [<option key="empty" value="" />, ...options];
}

function stripNonNumberChars(str: string): string {
  return str.replace(/[^0-9.]/g, '');
}

function isFormValid(
  fromAccountId: string,
  toAccountId: string,
  amount: string,
  fromAccountBalance: number,
): boolean {
  return (
    isValidAccount(fromAccountId) &&
    isValidAccount(toAccountId) &&
    isValidAmount(amount, fromAccountBalance)
  );
}
