/* @flow */

export type TNext = {
  movieA: string,
  movieB: string
}

export type TAction = {
  type: string,
  payload?: string | TNext
};

export type TActionCreator = {
  join: (name?: string) => TAction;
  vote: (movie: string) => TAction;
  next: () => TAction;
  startSetup: (name?: string) => TAction;
  hostQueueAdd: (movie: string) => TAction;
  hostQueueDelete: (movie: string) => TAction;
  hostStart: () => TAction;
  remoteHostReady: (hostName: string, movieA: string, movieB: string) => TAction;
  remoteVoteReceived: (movie: string) => TAction;
  remoteNext: (movieA: string, movieB: string) => TAction;
  remoteWinner: (movie: string) => TAction;
}

import {
  JOIN, VOTE, NEXT, START_SETUP,
  HOST_START, HOST_QUEUE_ADD, HOST_QUEUE_DELETE,
  REMOTE_HOST_READY, REMOTE_VOTE_RECEVIED, REMOTE_NEXT, REMOTE_WINNER
} from "./actionTypes";

// Join is triggered from UI and provides the name of the user from signing (nothing from winner)
// No remote
export function join(name?: string): TAction {
  return {
    type: JOIN,
    payload: name
  };
}

// Vote is trigger from UI and provides the name of the movie selected
// Broadcasts REMOTE_VOTE_RECEVIED
export function vote(movie: string): TAction {
  return {
    type: VOTE,
    payload: movie
  };
}

// Next is trigger from monitor UI
// Broadcasts REMOTE_NEXT or REMOTE_WINNER
export function next(): TAction {
  return {
    type: NEXT
  };
}

// StartSetup is triggered from UI and provides the name of the user if called from signin
// No remote
export function startSetup(name?: string): TAction {
  return {
    type: START_SETUP,
    payload: name
  };
}

// hostQueueAdd triggered from UI and adds a movie to the queue
// No remote
export function hostQueueAdd(movie: string): TAction {
  return {
    type: HOST_QUEUE_ADD,
    payload: movie
  };
}

// hostQueueDelete triggerd from the UI and removes a movie from the queue
// No remote
export function hostQueueDelete(movie: string): TAction {
  return {
    type: HOST_QUEUE_DELETE,
    payload: movie
  };
}

// hostStart triggered from UI and moves to monitor mode
// Broadcasts REMOTE_HOST_READY
export function hostStart(): TAction {
  return {
    type: HOST_START
  };
}

// REMOTE_HOST_READY is triggered be the remote host and provides host's name and the first two movies
export function remoteHostReady(hostName: string, movieA: string, movieB: string): TAction {
  return {
    type: REMOTE_HOST_READY,
    payload: { hostName, movieA, movieB }
  };
}

// REMOTE_VOTE_RECEVIED is triggered from participants onto monitor
export function remoteVoteReceived (movie: string): TAction {
  return {
    type: REMOTE_VOTE_RECEVIED,
    payload: movie
  };
}

// REMOTE_NEXT is triggered on client by host
export function remoteNext(movieA: string, movieB: string): TAction {
  return {
    type: REMOTE_NEXT,
    payload: {
      movieA,
      movieB
    }
  };
}

// REMOTE_WINNER triggered on clients by host (instead of next)
export function remoteWinner(movie: string): TAction {
  return {
    type: REMOTE_WINNER,
    payload: movie
  };
}

const actionCreators: TActionCreator = {
  join,
  vote,
  next,
  startSetup,
  hostStart,
  hostQueueAdd,
  hostQueueDelete,
  remoteHostReady,
  remoteVoteReceived,
  remoteNext,
  remoteWinner
};

export default actionCreators;
