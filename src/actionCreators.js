/* @flow */

export type TVote = {
  voter: string,
  movie: string
}

export type TNext = {
  movieA: string,
  movieB: string
}

export type TAction = {
  type: string,
  payload?: string | TVote | TNext
};

import {
  JOIN, VOTE, NEXT, START_SETUP,
  HOST_START, HOST_QUEUE_ADD, HOST_QUEUE_DELETE,
  REMOTE_HOST_READY, REMOTE_VOTE_RECEVIED, REMOTE_RESET,
  REMOTE_NEXT, REMOTE_WINNER
} from "./actionTypes";

// Join is triggered from UI and provides the name of the user
export function join(name: string): TAction {
  return {
    type: JOIN,
    payload: name
  };
}

// Vote is trigger from UI and provides the name of the movie selected
export function vote(movie: string): TAction {
  return {
    type: VOTE,
    payload: movie
  };
}

export function next(): TAction {
  return {
    type: NEXT
  };
}

// StartSetup is triggered from UI and provides the name of the user
export function startSetup(name: string): TAction {
  return {
    type: START_SETUP,
    payload: name
  };
}

// hostQueueAdd triggered from UI and adds a movie to the queue
export function hostQueueAdd(movie: string): TAction {
  return {
    type: HOST_QUEUE_ADD,
    payload: movie
  };
}

// hostQueueDelete triggerd from the UI and removes a movie from the queue
export function hostQueueDelete(movie: string): TAction {
  return {
    type: HOST_QUEUE_DELETE,
    payload: movie
  };
}

// hostStart triggered from UI and moves to monitor mode
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

export function remoteVoteReceived (voter: string, movie: string): TAction {
  return {
    type: REMOTE_VOTE_RECEVIED,
    payload: { voter, movie }
  };
}

export function remoteReset(): TAction {
  return {
    type: REMOTE_RESET
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

export function remoteWinner(movie: string): TAction {
  return {
    type: REMOTE_WINNER,
    payload: movie
  };
}

export default {
  join,
  vote,
  next,
  startSetup,
  hostStart,
  hostQueueAdd,
  hostQueueDelete,
  remoteHostReady,
  remoteVoteReceived,
  remoteReset,
  remoteNext,
  remoteWinner
};
