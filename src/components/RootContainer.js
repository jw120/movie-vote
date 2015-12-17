/* @flow */

import { connect } from "react-redux";

import type { TRootProps } from "../reducers/reducer";

import Root from "./Root";

type TTagOnly = {
  mode: string
};

function stateToProps(s: TRootProps): TTagOnly {
  if (!s.mode) {
    throw new Error("Unknown mode in RootContainer stateToProps");
  }
  return {
    mode: s.mode
  };
}

const RootContainer = connect(stateToProps)(Root);

export default RootContainer;
