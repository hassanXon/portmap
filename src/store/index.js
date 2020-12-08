import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from "history";
import makeRootReducer from './reducers';
import portMapReducer from './portMap/reducers';

export const history = createBrowserHistory();

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];

  let composeEnhancers = compose;

  if (process.env.NODE_ENV !== 'production') {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension;
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(history, {
      portMap: portMapReducer
    }), // root reducer with router state
    initialState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        ...middleware
      ),
      ...enhancers
    )
  );

  store.asyncReducers = {
    portMap: portMapReducer
  };

  return store;
};
