import { useSelector } from 'react-redux';
import { selectAccounts } from '../../app/store/accountsSlice';
import { AccountListItem } from '../../components/AccountListItem/AccountListItem';
import './AccountList.scss';

export const AccountList: React.FC = () => {
  const accounts = useSelector(selectAccounts);

  return (
    <div className="AccountList">
      {!accounts
        ? 'Loading...'
        : accounts.map((account) => <AccountListItem key={account.accountId} account={account} />)}
    </div>
  );
};
