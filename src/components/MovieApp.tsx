/* @flow */

import * as React from "react";

import SigninContainer  from "./SigninContainer";
import VotingContainer  from "./VotingContainer";
import SetupContainer   from "./SetupContainer";
import MonitorContainer from "./MonitorContainer";
import WinnerContainer  from "./WinnerContainer";

import { TMovieAppProps } from "../reducers/rootReducer";
import { MovieAppPropTypes } from "../reducers/rootReducer";

export default function MovieApp(props: TMovieAppProps) {

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

// MovieApp.propTypes = MovieAppPropTypes;
