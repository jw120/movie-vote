/* @flow */

import * as React from "react";

import SigninContainer  from "./SigninContainer";
import VotingContainer  from "./VotingContainer";
import SetupContainer   from "./SetupContainer";
import MonitorContainer from "./MonitorContainer";
import WinnerContainer  from "./WinnerContainer";

import { TMovieAppProps } from "../reducers/rootReducer";
import { MovieAppPropTypes } from "../reducers/rootReducer";
type NoState = {};

// export default function MovieApp(props: TMovieAppProps) {
export default class MovieApp extends React.Component<TMovieAppProps, NoState> {
  render() {
    switch (this.props.mode) {
      case "SIGNIN":
        return React.createElement(SigninContainer, this.props.signin);
      case "VOTING":
        return React.createElement(VotingContainer, this.props.voting);
      case "SETUP":
        return React.createElement(SetupContainer, this.props.setup);
      case "MONITOR":
        return React.createElement(MonitorContainer, this.props.monitor);
      case "WINNER":
        return React.createElement(WinnerContainer, this.props.winner);
    }
    return <div>Unknown mode { this.props.mode }</div>;
  }

}

// MovieApp.propTypes = MovieAppPropTypes;
