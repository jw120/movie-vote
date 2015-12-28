/* @flow */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Store } from "redux";
import { Provider } from "react-redux";

import { join, startSetup, hostQueueAdd, hostQueueDelete, hostStart, vote, next } from "./actionCreators";
import { SIGNIN } from "./stateTypes";
import configureStore from "./store/configureStore";
import App from "./containers/App";
import DevTools from "./components/DevTools";

// Load css via webpack
// require("bootstrap.min.css");
// require("../dist/styles.css");

// Start debugging
import * as MyDebug from "debug";
MyDebug.enable("mvc:*");

const store: Store = configureStore({
  mode: SIGNIN,
  onJoin: (name: string): void => store.dispatch(join(name)),
  onStartSetup: (name: string): void => store.dispatch(startSetup(name)),
  onAdd: (movie: string): void => store.dispatch(hostQueueAdd(movie)),
  onDelete: (movie: string): void => store.dispatch(hostQueueDelete(movie)),
  onStart: (): void => store.dispatch(hostStart()),
  onVote: (movie: string): void => store.dispatch(vote(movie)),
  onNext: (): void => store.dispatch(next())
});

// Setup socket client
import { initSocketClient } from "./socket";
import * as sic from "socket.io-client";
initSocketClient(store, sic("http://127.0.0.1:8003"));

// import Root from "./components/Root";
// import { mkSignin } from "./reducers/signin";
// import { /* remoteHostReady, /* , join, */
// startSetup /*, hostQueueAdd, hostStart, remoteWinner */ } from "./actionCreators";
// import type TMovieAppProps from "./reducers/rootReducer";

// Move into Signin state wth host available
// store.dispatch(remoteHostReady("henry", "Frozen", "Platoon"));

// Move into Voting state
// store.dispatch(remoteHostReady("henry", "Frozen", "Platoon"));
// store.dispatch(join("bob"));

// store.dispatch(remoteWinner("Platoon"));
// store.dispatch(remoteHostReady("henrietta", "Frozen 2", "Platoon Again"));

// Move into Setup state
// store.dispatch(startSetup("alice"));

// Move into Monitor state
// store.dispatch(startSetup("alice"));
// store.dispatch(hostQueueAdd("Frozen"));
// store.dispatch(hostQueueAdd("Walkabout"));
// store.dispatch(hostQueueAdd("Posiedon"));
// store.dispatch(hostStart());

ReactDOM.render(
  <Provider store={ store }>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById("root")
);
