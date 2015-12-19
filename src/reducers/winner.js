/* @flow */

// Props and reducer definitions for winner mode

import { PropTypes} from "react";

import {
  JOIN, START_SETUP, REMOTE_HOST_READY
} from "../actionTypes";

import type { TAction } from "../actionCreators";
import type { TMovieAppProps } from "./rootReducer";

import { mkVoting } from "./voting";
import { mkSetup } from "./setup";

export type TWinnerProps = {
   name: string,
   hostName: ?string,
   winner: string,
   movieA: ?string,
   movieB: ?string
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

export function mkWinner(name: string, hostName: ?string, winner: string, movieA: ?string, movieB: ?string): TMovieAppProps {
  return promoteWinner( { name, hostName, winner, movieA, movieB } );
}

export function unwrapWinner(s: TMovieAppProps): TWinnerProps {
  if (s.mode === "WINNER") {
    return s.winner;
  } else {
    throw new Error("Failed in unwrapWinner, mode was " + s.mode);
  }
}

export function winnerReducer(w: TWinnerProps, action: TAction): TMovieAppProps {

  switch (action.type) {

    case JOIN:
      if (w.hostName && w.movieA && w.movieB) {
        return mkVoting(w.name, w.hostName, w.movieA, w.movieB, null);
      }
      break;

    case START_SETUP:
      return mkSetup(w.name, []);

    case REMOTE_HOST_READY:
      if (action.payload &&
          action.payload.hostName && action.payload.movieA && action.payload.movieB &&
          typeof action.payload.hostName === "string" &&
          typeof action.payload.movieA === "string" &&
          typeof action.payload.movieB === "string") {
        return mkWinner(w.name, action.payload.hostName, w.winner, action.payload.movieA, action.payload.movieB);
      }
      break;
  }

  return promoteWinner(w);
}
