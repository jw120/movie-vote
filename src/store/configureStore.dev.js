/* @flow */

import { createStore, /* applyMiddleware, */ compose } from "redux";
import { persistState } from "redux-devtools";
import rootReducer from "../reducers/rootReducer";
import DevTools from "../components/DevTools";

import type TStore from "../components/Root.dev";

const finalCreateStore = compose(
  // Middleware you want to use in development:
  // applyMiddleware(d1, d2, d3),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument(),
  // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
  persistState(getDebugSessionKey())
)(createStore);

function getDebugSessionKey() {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}

export default function configureStore(initialState?: any): TStore {
  const store = finalCreateStore(rootReducer, initialState);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  // Taken from redux-devtools example, not clear if it does anything...
  if (module.hot) {
    module.hot.accept("../reducers/rootReducer", () =>
      store.replaceReducer(require("../reducers/rootReducer")/*.default if you use Babel 6+ */)
    );
  }

  return store;
}
