/* @flow */

// State and reducer definitions for winner mode

import {
  JOIN, START_SETUP, REMOTE_HOST_READY
} from "../actionTypes";

import type { TAction } from "../actionCreators";
import type { TState } from "./reducer";

import { mkVoting } from "./voting";
import { mkSetup } from "./setup";


export type TWinnerState = {
   name: string,
   hostName: ?string,
   winner: string,
   movieA: ?string,
   movieB: ?string
}

function promoteWinner(w: TWinnerState): TState {
  return {
    mode: "WINNER",
    winner: w
  };
}

export function mkWinner(name: string, hostName: ?string, winner: string, movieA: ?string, movieB: ?string): TState {
  return promoteWinner( { name, hostName, winner, movieA, movieB } );
}

export function winnerReducer(w: TWinnerState, action: TAction): TState {

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
