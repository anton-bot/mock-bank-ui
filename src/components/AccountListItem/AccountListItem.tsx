import { useHistory } from 'react-router';
import { formatCurrency } from '../../functions/formatCurrency';
import { navigate } from '../../functions/navigate';
import { BankAccount } from '../../types/BankAccount';
import { Page } from '../../types/Page';
import { AccountNumber } from '../AccountNumber/AccountNumber';
import { CurrencyLabel } from '../CurrencyLabel/CurrencyLabel';
import './AccountListItem.scss';

type Props = {
  account: BankAccount;
};

export const AccountListItem: React.FC<Props> = (props) => {
  const { balance, currency, accountNumber, accountId } = props.account;
  const history = useHistory();

  return (
    <div
      className="AccountListItem"
      onClick={() => navigate(history, Page.viewAccount, { accountId })}
    >
      <div className="metadata">
        <CurrencyLabel currency={currency} />
        <AccountNumber accountNumber={accountNumber} />
      </div>
      <div className="balance">{formatCurrency(balance, currency)}</div>
    </div>
  );
};
