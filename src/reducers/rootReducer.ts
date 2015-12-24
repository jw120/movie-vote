/* @flow */

// Top-level state and reducer definitions

import { PropTypes } from "react";

import { TAction } from "../actionCreators";

import { TSigninProps } from "./signin";
import { TVotingProps } from "./voting";
import { TSetupProps } from "./setup";
import { TMonitorProps } from "./monitor";
import { TWinnerProps } from "./winner";

import { signinReducer, mkSignin } from "./signin";
import { votingReducer } from "./voting";
import { setupReducer } from "./setup";
import { monitorReducer } from "./monitor";
import { winnerReducer } from "./winner";

export type TMovieAppProps = {
  mode: string,
  signin?: TSigninProps,
  setup?: TSetupProps,
  voting?: TVotingProps,
  monitor?: TMonitorProps,
  winner?: TWinnerProps
};

export const MovieAppPropTypes = {
  mode: PropTypes.string.isRequired,
  signin:  PropTypes.object,
  setup:   PropTypes.object,
  voting:  PropTypes.object,
  monitor: PropTypes.object,
  winner:  PropTypes.object
};

const INITIAL_STATE: TMovieAppProps = mkSignin();

export default function rootReducer(state: TMovieAppProps = INITIAL_STATE, action: TAction): TMovieAppProps {
  switch (state.mode) {
    case "SIGNIN":
      return signinReducer(state.signin, action);
    case "VOTING":
      return votingReducer(state.voting, action);
    case "SETUP":
      return setupReducer(state.setup, action);
    case "MONITOR":
      return monitorReducer(state.monitor, action);
    case "WINNER":
      return winnerReducer(state.winner, action);

  }

  return state;
}
