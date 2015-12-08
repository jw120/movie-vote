/* @flow */

// Top-level state and reducer definitions

import { PropTypes } from "react";

import type { TAction } from "../actionCreators";

import type { TSigninState } from "./signin";
import type { TVotingState } from "./voting";
import type { TSetupState } from "./setup";
import type { TMonitorState } from "./monitor";
import type { TWinnerState } from "./winner";

import { signinReducer, mkSignin } from "./signin";
import { votingReducer } from "./voting";
import { setupReducer } from "./setup";
import { monitorReducer } from "./monitor";
import { winnerReducer } from "./winner";

export type TState =
  { mode: "SIGNIN", signin: TSigninState } |
  { mode: "SETUP", setup: TSetupState } |
  { mode: "VOTING", voting: TVotingState } |
  { mode: "MONITOR", monitor: TMonitorState } |
  { mode: "WINNER", winner: TWinnerState };

export const RootPropTypes = {
  mode: PropTypes.string.isRequired,
  signin:  PropTypes.object,
  setup:   PropTypes.object,
  voting:  PropTypes.object,
  monitor: PropTypes.object,
  winner:  PropTypes.object
};

const INITIAL_STATE: TState = mkSignin();

export default function reducer(state: TState = INITIAL_STATE, action: TAction): TState {

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
