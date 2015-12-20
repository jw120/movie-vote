/* @flow */

import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/configureStore";

// Load css via webpack
require("bootstrap.min.css");
require("../dist/styles.css");

// Start debugging
import * as MyDebug from "debug";
MyDebug.enable("mvc:*");

import Root from "./components/Root";
// import { mkSignin } from "./reducers/signin";
import { /* remoteHostReady, /* , join, */ startSetup /*, hostQueueAdd, hostStart, remoteWinner */ } from "./actionCreators";
// import type TMovieAppProps from "./reducers/rootReducer";

// const INITIAL_STATE: TMovieAppProps = mkSignin();
const store = configureStore();

// Move into Signin state wth host available
// store.dispatch(remoteHostReady("henry", "Frozen", "Platoon"));

// Move into Voting state
// store.dispatch(remoteHostReady("henry", "Frozen", "Platoon"));
// store.dispatch(join("bob"));

// store.dispatch(remoteWinner("Platoon"));
// store.dispatch(remoteHostReady("henrietta", "Frozen 2", "Platoon Again"));

// Move into Setup state
store.dispatch(startSetup("alice"));

// Move into Monitor state
// store.dispatch(startSetup("alice"));
// store.dispatch(hostQueueAdd("Frozen"));
// store.dispatch(hostQueueAdd("Walkabout"));
// store.dispatch(hostQueueAdd("Posiedon"));
// store.dispatch(hostStart());

ReactDOM.render(
  <Root store={ store }/>,
  document.getElementById("root")
);
