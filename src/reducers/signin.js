/* @flow */

// State and reducer definitions for signin mode

/*
 * Signin mode is ended by joining a vote hosted elsewhere or by offering to setup a vote
 * Only state change possible is recognizing a remote host
 */

import {
  JOIN, START_SETUP, REMOTE_HOST_READY
} from "../actionTypes";

import type { TAction } from "../actionCreators";

import type { TState } from "./reducer";
import { mkVoting } from "./voting";

export type TSigninState = {
   hostName: ?string
}

function promoteSignin(s: TSigninState): TState {
  return {
    mode: "SIGNIN",
    signin: s
  };
}

export function mkSignin(hostName: ?string): TState {
  return promoteSignin({ hostName });
}

export function signinReducer(s: TSigninState, action: TAction): TState {

  switch (action.type) {

    case JOIN:
      if (s.hostName && typeof action.payload === "string") {
        return mkVoting(action.payload, s.hostName, "AA", "BB", null);
      }
      break;

    case START_SETUP:
      if (typeof action.payload === "string") {
        return {
          mode: "SETUP",
          name: action.payload,
          queue: []
        };
      }
      break;

    case REMOTE_HOST_READY:
      if (typeof action.payload === "string") {
        return mkSignin(action.payload);
      }
      break;
  }

  return promoteSignin(s);

}
