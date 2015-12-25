/* @flow */

// Props and reducer definitions for signin mode

import { PropTypes } from "react";

import {
  isJoinAction, isStartSetupAction, isRemoteHostReadyAction,
  IAction
} from "../actionCreators";

import { TMovieAppProps } from "./rootReducer";
import { mkVoting } from "./voting";
import { mkSetup } from "./setup";

function promoteSignin(s: TSigninProps): TMovieAppProps {
  return {
    mode: "SIGNIN",
    signin: s
  };
}

export function mkSignin(hostName?: string, movieA?: string, movieB?: string): TMovieAppProps {
  if (hostName !== undefined && movieA !== undefined && movieB !== undefined) {
    return promoteSignin( { hostName, movieA, movieB } );
  } else {
    return promoteSignin( { hostName: null, movieA: null, movieB: null } );
  }
}

export function unwrapSignin(s: TMovieAppProps): TSigninProps {
  if (s.mode === "SIGNIN") {
    return s.signin;
  } else {
    throw new Error("Failed in unwrapSignin, mode was " + s.mode);
  }
}

export function signinReducer(s: TSigninProps, action: IAction): TMovieAppProps {

  if (isJoinAction(action)) {
    if (s.hostName && action.name && s.movieA && s.movieB) {
      return mkVoting(action.name, s.hostName, s.movieA, s.movieB, null);
    }
  } else if (isStartSetupAction(action)) {
    if (action.name) {
      return mkSetup(action.name, []);
    }
  } else if (isRemoteHostReadyAction(action)) {
    if (action.hostName && action.movieA && action.movieB) {
      return mkSignin(action.hostName, action.movieA, action.movieB);
    }
  }
  return promoteSignin(s);

}
