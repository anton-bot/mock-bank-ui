import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { selectAccountById } from '../../app/store/accountsSlice';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { formatBankAccountNumber } from '../../functions/formatBankAccountNumber';
import { formatCurrency } from '../../functions/formatCurrency';
import { lang } from '../../languages/lang';
import { TransactionListItem } from '../../components/TransactionListItem/TransactionListItem';
import './ViewAccount.scss';
import { Page } from '../../types/Page';
import { GoBack } from '../../components/GoBack/GoBack';

type Props = RouteComponentProps<{
  accountId: string;
}>;

export const ViewAccount: React.FC<Props> = (props) => {
  const { accountId } = props.match.params;
  const account = useSelector(selectAccountById(accountId));
  const text = lang().viewAccount;

  if (!account) {
    return <div />;
  }

  return (
    <div className="ViewAccount">
      <GoBack to={Page.accountList}>{text.buttons.back}</GoBack>
      <PageTitle>{getTitle(text.title, account.currency, account.accountNumber)}</PageTitle>
      <div className="balance">{formatCurrency(account.balance, account.currency)}</div>
      <div className="transactions">
        {account.transactions.length === 0 && text.messages.noTransactions}
        {account.transactions.map((t) => (
          <TransactionListItem key={t.transactionId} transaction={t} currency={account.currency} />
        ))}
      </div>
    </div>
  );
};

function getTitle(template: string, currency: string, accountNumber: string) {
  return template
    .replace(/{currency}/g, currency)
    .replace(/{number}/g, formatBankAccountNumber(accountNumber));
}
