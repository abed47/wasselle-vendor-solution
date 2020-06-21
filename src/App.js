import React, {lazy, Suspense, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import './App.scss';

import MainContextProvider, {MainContext} from './Context';
import NAVBAR from './components/NAVBAR';

const Login = lazy(() => import('./components/LOGIN.js'));
const Home = lazy(() => import('./components/HOME.js'));
const Items = lazy(() => import('./components/ITEMS.js'));
const Dashboard = lazy(() => import('./components/DASHBOARD.js'));
const Orders = lazy(() => import('./components/ORDERS'));
const Reports = lazy(() => import('./components/REPORTS'));

const theme = createMuiTheme({
  palette:{
    primary: {
      main: "#79c4f0"
    }
  }
})

function App() {

  const context = useContext(MainContext);

  useEffect(() => {
    console.log(context)
  }, [])

  return (
    <Suspense fallback={null}>
      <Router>
        <Switch>
          <ThemeProvider theme={theme}>
            <MainContextProvider>
              <Route exact path="/login" component={Login}/>
              <Route exact path={['/', '/items', '/reports', '/orders']}>
                <NAVBAR>
                  <Route exact  path="/" component={Dashboard} />
                  <Route exact  path="/items" component={Items} />
                  <Route exact  path="/reports" component={Reports} />
                  <Route exact  path="/orders" component={Orders} />
                </NAVBAR>
              </Route>
            </MainContextProvider>
          </ThemeProvider>
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
