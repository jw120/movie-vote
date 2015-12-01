/* @flow */

// Top-level state and reducer definitions

import type { TAction } from "./actionCreators";
import type { TSigninState } from "./signinMode";
import { signinReducer, mkSignin } from "./signinMode";
import type { TVotingState } from "./votingMode";
import { votingReducer } from "./votingMode";

export type TState =
  { mode: "SIGNIN", signin: TSigninState } |
  { mode: "SETUP", name: string, queue: string[] } |
  { mode: "VOTING", voting: TVotingState } |
  { mode: "MONITOR", name: string, movieA: string, movieB: string, scoreA: number, scoreB: number, queue: string[] } |
  { mode: "WINNER", name: string, hostName: string, winner: string };

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
