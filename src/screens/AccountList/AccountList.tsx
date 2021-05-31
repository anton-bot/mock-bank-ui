import { useSelector } from 'react-redux';
import { selectAccounts } from '../../app/store/accountsSlice';
import { AccountListItem } from '../../components/AccountListItem/AccountListItem';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { lang } from '../../languages/lang';
import './AccountList.scss';

export const AccountList: React.FC = () => {
  const accounts = useSelector(selectAccounts);
  const text = lang().accountList;

  return (
    <div className="AccountList">
      <PageTitle>{text.title}</PageTitle>
      {!accounts
        ? 'Loading...'
        : accounts.map((account) => <AccountListItem key={account.accountId} account={account} />)}
    </div>
  );
};
