import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import './App.scss';

import MainContextProvider from './Context';
const Login = lazy(() => import('./components/LOGIN.js'));
const Home = lazy(() => import('./components/HOME.js'));
const Items = lazy(() => import('./components/ITEMS.js'));
const Dashboard = lazy(() => import('./components/DASHBOARD.js'));

const theme = createMuiTheme({
  palette:{
    primary: {
      main: "#79c4f0"
    }
  }
})

function App() {
  return (
    <Suspense fallback={null}>
      <Router>
        <Switch>
          <ThemeProvider theme={theme}>
            <MainContextProvider>
              <Route exact path="/login" component={Login}/>
              <Route  path="/" component={Home} />
            </MainContextProvider>
          </ThemeProvider>
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
