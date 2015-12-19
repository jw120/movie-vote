/* @flow */

// Props and reducer definitions for voting mode

import { PropTypes } from "react";

import {
  VOTE, REMOTE_NEXT, REMOTE_WINNER
} from "../actionTypes";

import { broadcastVote } from "../socket";
import type { TAction } from "../actionCreators";

import type { TMovieAppProps } from "./rootReducer";
import { mkWinner } from "./winner";

export type TVotingProps = {
   name: string,
   hostName: string,
   movieA: string,
   movieB: string,
   voted:  ?string
}
export const VotingPropTypes = {
  name:     PropTypes.string.isRequired,
  hostName: PropTypes.string.isRequired,
  movieA:   PropTypes.string.isRequired,
  movieB:   PropTypes.string.isRequired,
  voted:    PropTypes.string
};

function promoteVoting(v: TVotingProps): TMovieAppProps {
  return {
    mode: "VOTING",
    voting: v
  };
}

export function mkVoting(name: string, hostName: string, movieA: string, movieB: string, voted: ?string): TMovieAppProps {
  return promoteVoting( {
    name,
    hostName,
    movieA,
    movieB,
    voted
  });
}

export function unwrapVoting(s: TMovieAppProps): TVotingProps {
  if (s.mode === "VOTING") {
    return s.voting;
  } else {
    throw new Error("Failed in unwrapVoting, mode was " + s.mode);
  }
}

export function votingReducer(v: TVotingProps, action: TAction): TMovieAppProps {

  switch (action.type) {

    case VOTE:
      if (typeof action.payload === "string") {
        let movie: string = action.payload;
        if (movie === v.movieA || movie === v.movieB && !v.voted) {
          broadcastVote(movie);
          return mkVoting(v.name, v.hostName, v.movieA, v.movieB, movie);
        }
      }
      break;

    case REMOTE_NEXT:
      if (action.payload && action.payload.movieA && action.payload.movieB &&
          typeof action.payload.movieA === "string" && typeof action.payload.movieB === "string") {
        return mkVoting(v.name, v.hostName, action.payload.movieA, action.payload.movieB, null);
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
