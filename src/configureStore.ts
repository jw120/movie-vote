import { createStore, Store, compose } from "redux";
import { persistState } from "redux-devtools";
import rootReducer from "./reducers/rootReducer";
import DevTools from "./components/DevTools";

const finalCreateStore: Function = compose(
  // applyMiddleware(d1, d2, d3),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument(),
  persistState(getDebugSessionKey())
)(createStore);

function getDebugSessionKey(): string {
  const matches: string[] = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
}

export default function configureStore(initialState?: any): Store {
  const store: Store = finalCreateStore(rootReducer, initialState);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  // Taken from redux-devtools example, not clear if it does anything...
  // if (module.hot) {
  //   module.hot.accept("../reducers/rootReducer", () =>
  //     store.replaceReducer(require("../reducers/rootReducer")/*.default if you use Babel 6+ */)
  //   );
  // }

  return store;
}
