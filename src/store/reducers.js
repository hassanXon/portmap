import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history as browserHistory } from "./index";

export const makeRootReducer = (history, asyncReducers = {}) => {
  return combineReducers({
    router: connectRouter(history),
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(browserHistory, store.asyncReducers));
};

export default makeRootReducer;
