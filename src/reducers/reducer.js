/* @flow */

// Top-level state and reducer definitions

import { PropTypes } from "react";

import type { TAction } from "../actionCreators";

import type { TSigninProps } from "./signin";
import type { TVotingProps } from "./voting";
import type { TSetupProps } from "./setup";
import type { TMonitorProps } from "./monitor";
import type { TWinnerProps } from "./winner";

import { signinReducer, mkSignin } from "./signin";
import { votingReducer } from "./voting";
import { setupReducer } from "./setup";
import { monitorReducer } from "./monitor";
import { winnerReducer } from "./winner";

export type TRootProps =
  { mode: "SIGNIN", signin: TSigninProps } |
  { mode: "SETUP", setup: TSetupProps } |
  { mode: "VOTING", voting: TVotingProps } |
  { mode: "MONITOR", monitor: TMonitorProps } |
  { mode: "WINNER", winner: TWinnerProps };

export const RootPropTypes = {
  mode: PropTypes.string.isRequired,
  signin:  PropTypes.object,
  setup:   PropTypes.object,
  voting:  PropTypes.object,
  monitor: PropTypes.object,
  winner:  PropTypes.object
};

const INITIAL_STATE: TRootProps = mkSignin();

export default function reducer(state: TRootProps = INITIAL_STATE, action: TAction): TRootProps {
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
