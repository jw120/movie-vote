/* @flow */

// State and reducer definitions for voting mode

/*
 * Voting mode is ended by
 * Responds to VOTE and REMOTE_NEXT
 */

import {
  VOTE, REMOTE_NEXT, REMOTE_WINNER
} from "../actionTypes";

import { broadcastVote } from "../socket";
import type { TAction } from "../actionCreators";

import type { TState } from "./reducer";

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
      if (typeof action.payload !== "undefined" && typeof action.payload[0] === "string" && typeof action.payload[1] === "string") {
        return promoteVoting( { ...v, movieA: action.payload[0], movieB: action.payload[1], voted: null });
      }
      break;

    case REMOTE_WINNER:
      if (typeof action.payload === "string") {
        return {
          mode: "WINNER",
          name: v.name,
          hostName: v.hostName,
          winner: action.payload
        };
      }
      break;
  }

  return promoteVoting(v);
}
