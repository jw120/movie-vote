/* @flow */

// Props and reducer definitions for voting mode

import { PropTypes } from "react";

import {
  isVoteAction, isRemoteNextAction, isRemoteWinnerAction,
  IAction
} from "../actionCreators";

import { broadcastRemoteVoteReceived } from "../socket";

import { TMovieAppProps } from "./rootReducer";
import { mkWinner } from "./winner";

export type TVotingProps = {
   name: string,
   hostName: string,
   movieA: string,
   movieB: string,
   voted:  string
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

export function mkVoting(name: string, hostName: string, movieA: string, movieB: string, voted: string): TMovieAppProps {
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

export function votingReducer(v: TVotingProps, action: IAction): TMovieAppProps {

  if (isVoteAction(action)) {
    if (action.movie === v.movieA || action.movie === v.movieB && !v.voted) {
      broadcastRemoteVoteReceived(action.movie);
      return mkVoting(v.name, v.hostName, v.movieA, v.movieB, action.movie);
    }
  } else if (isRemoteNextAction(action)) {
    if (action.movieA && action.movieB) {
      return mkVoting(v.name, v.hostName, action.movieA, action.movieB, null);
    }
  } else if (isRemoteWinnerAction(action)) {
    return mkWinner(v.name, null, action.movie, null, null);
  }

  return promoteVoting(v);
}
