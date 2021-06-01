import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchAccounts } from '../../app/store/accountsSlice';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { navigate } from '../../functions/navigate';
import { lang } from '../../languages/lang';
import { Page } from '../../types/Page';
import './TransferCompleted.scss';

const AUTO_REDIRECT_AFTER_MS = 1000;

export const TransferCompleted = () => {
  const text = lang().transferCompleted;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => navigate(history, Page.accountList), AUTO_REDIRECT_AFTER_MS);
  }, [dispatch, history]);

  return (
    <div className="TransferCompleted">
      <div className="checkmark">✔️</div>
      <PageTitle>{text.title}</PageTitle>
    </div>
  );
};
