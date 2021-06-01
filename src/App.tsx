import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.scss';
import { fetchAccounts } from './app/store/accountsSlice';
import { Layout } from './components/Layout/Layout';
import { AccountList } from './screens/AccountList/AccountList';
import { Page } from './types/Page';
import { ViewAccount } from './screens/ViewAccount/ViewAccount';
import { TransferBetweenAccounts } from './screens/TransferBetweenAccounts/TransferBetweenAccounts';
import { TransferCompleted } from './screens/TransferCompleted/TransferCompleted';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path={Page.root}>
              <AccountList />
            </Route>
            <Route path={Page.viewAccount} render={(props) => <ViewAccount {...props} />} />
            <Route path={Page.accountList}>
              <AccountList />
            </Route>
            <Route path={Page.transfer}>
              <TransferBetweenAccounts />
            </Route>
            <Route path={Page.transferCompleted}>
              <TransferCompleted />
            </Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
