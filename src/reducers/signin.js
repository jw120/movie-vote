/* @flow */

// State and reducer definitions for signin mode

import { PropTypes } from "react";

import {
  JOIN, START_SETUP, REMOTE_HOST_READY
} from "../actionTypes";

import type { TAction } from "../actionCreators";

import type { TState } from "./reducer";
import { mkVoting } from "./voting";
import { mkSetup } from "./setup";

export type TSigninState = {
   hostName: ?string,
   movieA:   ?string,
   movieB:   ?string
}

export const SigninProptypes = {
  hostName: PropTypes.string,
  movieA:   PropTypes.string,
  movieB:  PropTypes.string
};

function promoteSignin(s: TSigninState): TState {
  return {
    mode: "SIGNIN",
    signin: s
  };
}

export function mkSignin(hostName?: string, movieA?: string, movieB?: string): TState {
  if (hostName !== undefined && movieA !== undefined && movieB !== undefined) {
    return promoteSignin( { hostName, movieA, movieB } );
  } else {
    return promoteSignin( { hostName: null, movieA: null, movieB: null } );
  }
}

export function unwrapSignin(s: TState): TSigninState {
  if (s.mode === "SIGNIN") {
    return s.signin;
  } else {
    throw new Error("Failed in unwrapSignin, mode was " + s.mode);
  }
}

export function signinReducer(s: TSigninState, action: TAction): TState {

  switch (action.type) {

    case JOIN:
      if (s.hostName && typeof action.payload === "string" && action.payload && s.movieA && s.movieB) {
        return mkVoting(action.payload, s.hostName, s.movieA, s.movieB, null);
      }
      break;

    case START_SETUP:
      if (action.payload && typeof action.payload === "string") {
        return mkSetup(action.payload, []);
      }
      break;

    case REMOTE_HOST_READY:
      if (action.payload && action.payload.hostName && action.payload.movieA && action.payload.movieB &&
          typeof action.payload.hostName === "string" &&
          typeof action.payload.movieA === "string" &&
          typeof action.payload.movieB === "string") {
        return mkSignin(action.payload.hostName, action.payload.movieA, action.payload.movieB);
      }
      break;
  }

  return promoteSignin(s);

}
