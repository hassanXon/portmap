import React from 'react';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './store';
import Home from './components/Home';
import Counter from './components/Counter';
import CoreLayout from './components/layouts/CoreLayout';
import './App.css';

const initialState = window.location.pathname;
const store = configureStore();
export const AppContext = React.createContext(initialState);

const AppNoProvider = () => (
  <Router history={history}>
    <div className="App">
      <CoreLayout>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </CoreLayout>
    </div>
  </Router>
)

const AppWithContext = () => (
  <AppContext.Provider value={initialState}>
    <Router history={history}>
      <div className="App">
        <CoreLayout>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </CoreLayout>
      </div>
    </Router>
  </AppContext.Provider>
)

const AppWithRedux = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="App">
        <CoreLayout>
          <Switch>
            <Route path="/counter" component={Counter(store)} />
            <Route path="/" component={Home} />
          </Switch>
        </CoreLayout>
      </div>
    </ConnectedRouter>
  </Provider>
)

function App() {
  const { REACT_APP_STATE_MGMT } = process.env;
  const isRedux = REACT_APP_STATE_MGMT === 'REDUX';
  const isContext = REACT_APP_STATE_MGMT === 'CONTEXT'

  return isRedux ? AppWithRedux() : 
    isContext ? AppWithContext() : AppNoProvider();
}

export default App;
