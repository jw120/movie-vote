/* @flow */

// State and reducer definitions for signin mode

/*
 * Signin mode is ended by joining a vote hosted elsewhere or by offering to setup a vote
 * Only state change possible is recognizing a remote host
 */


import {
  JOIN, START_SETUP, REMOTE_HOST_READY
} from "./ActionTypes";

import type { TAction } from "./actionCreators";
import type { TState } from "./reducer";

export type TSigninState = {
   name?: string,
   hostName?: string
 }

export function signinReducer(s: TSigninState, action: TAction): TState {

  switch (action.type) {

    case JOIN:
      if (s.hostName && typeof action.payload === "string") {
        return {
          mode: "VOTING",
          voting: {
            name: action.payload,
            hostName: s.hostName,
            movieA: null,
            movieB: null,
            voted: null
          }
        };
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
        return {
          mode: "SIGNIN",
          signin: {
            ...s,
            hostName: action.payload
          }
        };
      }
      break;
  }

  return {
    mode: "SIGNIN",
    signin: s
  };
}
