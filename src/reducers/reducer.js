/* @flow */

// Top-level state and reducer definitions

import type { TAction } from "../actionCreators";

import type { TSigninState } from "./signin";
import { signinReducer, mkSignin } from "./signin";
import type { TVotingState } from "./voting";
import { votingReducer } from "./voting";
import type { TSetupState } from "./setup";
import type { TWinnerState } from "./winner";

export type TState =
  { mode: "SIGNIN", signin: TSigninState } |
  { mode: "SETUP", setup: TSetupState } |
  { mode: "VOTING", voting: TVotingState } |
  { mode: "MONITOR", name: string, movieA: string, movieB: string, scoreA: number, scoreB: number, queue: string[] } |
  { mode: "WINNER", winner: TWinnerState };

const INITIAL_STATE: TState = mkSignin();

export default function reducer(state: TState = INITIAL_STATE, action: TAction): TState {

  switch (state.mode) {
    case "SIGNIN":
      return signinReducer(state.signin, action);
    case "VOTING":
      return votingReducer(state.voting, action);

  }

  return state;
}
