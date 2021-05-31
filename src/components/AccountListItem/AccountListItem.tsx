import { formatCurrency } from '../../functions/formatCurrency';
import { BankAccount } from '../../types/BankAccount';
import { AccountNumber } from '../AccountNumber/AccountNumber';
import { CurrencyLabel } from '../CurrencyLabel/CurrencyLabel';
import './AccountListItem.scss';

type Props = {
  account: BankAccount;
};

export const AccountListItem: React.FC<Props> = (props) => {
  const { balance, currency, accountNumber } = props.account;

  return (
    <div className="AccountListItem">
      <div className="metadata">
        <CurrencyLabel currency={currency} />
        <AccountNumber accountNumber={accountNumber} />
      </div>
      <div className="balance">{formatCurrency(balance, currency)}</div>
    </div>
  );
};
