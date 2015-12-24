/* @flow */

// Props and reducer definitions for winner mode

import { PropTypes} from "react";

import {
  isJoinAction, isStartSetupAction, isRemoteHostReadyAction,
  IAction
} from "../actionCreators";
import { TMovieAppProps } from "./rootReducer";

import { mkVoting } from "./voting";
import { mkSetup } from "./setup";

export type TWinnerProps = {
   name: string,
   hostName: string,
   winner: string,
   movieA: string,
   movieB: string
}

export const WinnerPropTypes = {
  name:     PropTypes.string,
  winner:   PropTypes.string.isRequired,
  hostName: PropTypes.string,
  movieA:   PropTypes.string,
  movieB:   PropTypes.string
};

function promoteWinner(w: TWinnerProps): TMovieAppProps {
  return {
    mode: "WINNER",
    winner: w
  };
}

export function mkWinner(name: string, hostName: string, winner: string, movieA: string, movieB: string): TMovieAppProps {
  return promoteWinner( { name, hostName, winner, movieA, movieB } );
}

export function unwrapWinner(s: TMovieAppProps): TWinnerProps {
  if (s.mode === "WINNER") {
    return s.winner;
  } else {
    throw new Error("Failed in unwrapWinner, mode was " + s.mode);
  }
}

export function winnerReducer(w: TWinnerProps, action: IAction): TMovieAppProps {

  if (isJoinAction(action)) {
    if (w.hostName && w.movieA && w.movieB) {
      return mkVoting(w.name, w.hostName, w.movieA, w.movieB, null);
    }
  } else if (isStartSetupAction(action)) {
    return mkSetup(w.name, []);
  } else if (isRemoteHostReadyAction(action)) {
    if (action.hostName && action.movieA && action.movieB) {
      return mkWinner(w.name, action.hostName, w.winner, action.movieA, action.movieB);
    }
  }

  return promoteWinner(w);
}
