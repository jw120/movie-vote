/* @flow */

import * as React from "react";

import SigninContainer  from "./SigninContainer";
import VotingContainer  from "./VotingContainer";
import SetupContainer   from "./SetupContainer";
import MonitorContainer from "./MonitorContainer";
import WinnerContainer  from "./WinnerContainer";

import type { TState } from "../reducers/reducer";
import { RootPropTypes } from "../reducers/reducer";

export default function Root(props: TState) {

  switch (props.mode) {
    case "SIGNIN":
      return <SigninContainer />;
    case "VOTING":
      return <VotingContainer />;
    case "SETUP":
      return <SetupContainer />;
    case "MONITOR":
      return <MonitorContainer />;
    case "WINNER":
      return <WinnerContainer />;
  }
  return <div>Unknown mode { props.mode }</div>;

}

Root.propTypes = RootPropTypes;
