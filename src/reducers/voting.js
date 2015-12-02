/* @flow */

// State and reducer definitions for voting mode

import {
  VOTE, REMOTE_NEXT, REMOTE_WINNER
} from "../actionTypes";

import { broadcastVote } from "../socket";
import type { TAction } from "../actionCreators";

import type { TState } from "./reducer";
import { mkWinner } from "./winner";

export type TVotingState = {
  name: string,
  hostName: string,
  movieA: string,
  movieB: string,
  voted: ?string
}

function promoteVoting(v: TVotingState): TState {
  return {
    mode: "VOTING",
    voting: v
  };
}

export function mkVoting(name: string, hostName: string, movieA: string, movieB: string, voted: ?string): TState {
  return promoteVoting( {
    name,
    hostName,
    movieA,
    movieB,
    voted
  });
}

export function unwrapVoting(s: TState): TVotingState {
  if (s.mode === "VOTING") {
    return s.voting;
  } else {
    throw new Error("Failed in unwrapVoting, mode was " + s.mode);
  }
}

export function votingReducer(v: TVotingState, action: TAction): TState {

  switch (action.type) {

    case VOTE:
      if (typeof action.payload === "string") {
        let movie: string = action.payload;
        if (movie === v.movieA || movie === v.movieB && !v.voted) {
          broadcastVote(movie);
          return promoteVoting( { ...v, voted: movie });
        }
      }
      break;

    case REMOTE_NEXT:
      if (action.payload && action.payload.movieA && action.payload.movieB &&
          typeof action.payload.movieA === "string" && typeof action.payload.movieB === "string") {
        return promoteVoting( {
          ...v,
          movieA: action.payload.movieA,
          movieB: action.payload.movieB,
          voted: null
        });
      }
      break;

    case REMOTE_WINNER:
      if (action.payload && typeof action.payload === "string") {
        return mkWinner(v.name, null, action.payload, null, null);
      }
      break;
  }

  return promoteVoting(v);
}
