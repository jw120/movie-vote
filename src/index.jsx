/* @flow */

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
import { remoteHostReady /* , join, startSetup, hostQueueAdd, hostStart, remoteWinner */ } from "./actionCreators";

// Redux store created based on our reducer, adding our middleware and devtools (with persistState)
const store = createStore(reducer);

// Move into Signin state wth host available
store.dispatch(remoteHostReady("henry", "Frozen", "Platoon"));

// Move into Voting state
// store.dispatch(remoteHostReady("henry", "Frozen", "Platoon"));
// store.dispatch(join("bob"));

// store.dispatch(remoteWinner("Platoon"));
// store.dispatch(remoteHostReady("henrietta", "Frozen 2", "Platoon Again"));

// Move into Monitor state
// store.dispatch(startSetup("alice"));
// store.dispatch(hostQueueAdd("Frozen"));
// store.dispatch(hostQueueAdd("Walkabout"));
// store.dispatch(hostQueueAdd("Posiedon"));
// store.dispatch(hostStart());

ReactDOM.render(
  <Provider store={ store }>
    <RootContainer />
  </Provider>,
  document.getElementById("root")
);
