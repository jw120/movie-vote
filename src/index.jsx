import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

// Load css via webpack
require("bootstrap.min.css");
require("../dist/styles.css");

// Start debugging
import * as MyDebug from "debug";
MyDebug.enable("mvc:*");

import reducer from "./reducers/reducer";
import RootContainer from "./components/RootContainer";
import { remoteHostReady, join } from "./actionCreators";

// Redux store created based on our reducer, adding our middleware and devtools (with persistState)
const store = createStore(reducer);

store.dispatch(remoteHostReady("henry", "Frozen", "Platoon"));
store.dispatch(join("bob"));

ReactDOM.render(
  <Provider store={store}>
    <RootContainer />
  </Provider>,
  document.getElementById("root")
);
