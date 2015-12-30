/* @flow */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Store } from "redux";
import { Provider } from "react-redux";

import { SIGNIN } from "./stateTypes";
import configureStore from "./configureStore";
import App from "./containers/App";
import DevTools from "./components/DevTools";

// Start debugger
import * as MyDebug from "debug";
MyDebug.enable("mvc:*");

// Initalize the redux store and specify the initial App state
const store: Store = configureStore({
  mode: SIGNIN
});

// Setup socket client
import { initSocketClient } from "./socket";
import * as sic from "socket.io-client";
initSocketClient(store, sic("http://127.0.0.1:8003"));

ReactDOM.render(
  <Provider store={ store }>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById("root")
);
