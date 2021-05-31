import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.scss';
import { fetchAccounts } from './app/store/accountsSlice';
import { Layout } from './components/Layout/Layout';
import { AccountList } from './screens/AccountList/AccountList';

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
            <Route exact path="/">
              <AccountList />
            </Route>
            <Route path="/app/accounts">
              <AccountList />
            </Route>
            <Route path="/app/transfer">
              <div>TODO: transfer screen</div>
            </Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
