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
import SigninContainer from "./components/SigninContainer";
// import Signin from "./components/Signin";
import { remoteHostReady } from "./actionCreators";

// Redux store created based on our reducer, adding our middleware and devtools (with persistState)
const store = createStore(reducer);

store.dispatch(remoteHostReady("henry", "a", "b"));

ReactDOM.render(
  <Provider store={store}>
    <SigninContainer />
  </Provider>,
  document.getElementById("root")
);
//
// ReactDOM.render(
//     <Signin />,
//   document.getElementById("root")
// );
