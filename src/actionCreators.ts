/* @flow */

import {
  JOIN, VOTE, NEXT, START_SETUP, HOST_START, HOST_QUEUE_ADD,
  HOST_QUEUE_DELETE, REMOTE_HOST_READY, REMOTE_VOTE_RECEIVED,
  REMOTE_NEXT, REMOTE_WINNER
} from "./actionTypes";

// Base interface for Actions
export interface IAction {
  type: string;
}

// Join is triggered from UI and provides the name of the user from signing (nothing from winner)
// No remote
export interface IJoinAction extends IAction {
  name?: string;
}
export function isJoinAction(action: IAction ): action is IJoinAction {
  return action.type === JOIN;
}
export function join(name?: string): IJoinAction {
  return {
    type: JOIN,
    name
  };
}

// Vote is trigger from UI and provides the name of the movie selected
// Broadcasts REMOTE_VOTE_RECEVIED
export interface IVoteAction extends IAction {
  movie: string;
}
export function isVoteAction(action: IAction ): action is IVoteAction {
  return action.type === VOTE;
}
export function vote(movie: string): IVoteAction {
  return {
    type: VOTE,
    movie
  };
}

// Next is trigger from monitor UI
// Broadcasts REMOTE_NEXT or REMOTE_WINNER
export interface INextAction extends IAction {
}
export function isNextAction(action: IAction ): action is INextAction {
  return action.type === NEXT;
}
export function next(): IAction {
  return {
    type: NEXT
  };
}

// StartSetup is triggered from UI and provides the name of the user if called from signin
// No remote
export interface IStartSetupAction extends IAction {
  name?: string;
}
export function isStartSetupAction(action: IAction ): action is IStartSetupAction {
  return action.type === START_SETUP;
}
export function startSetup(name?: string): IStartSetupAction {
  return {
    type: START_SETUP,
    name
  };
}

// hostQueueAdd triggered from UI and adds a movie to the queue
// No remote
export interface IHostQueueAddAction extends IAction {
  movie: string;
}
export function isHostQueueAddAction(action: IAction ): action is IHostQueueAddAction {
  return action.type === HOST_QUEUE_ADD;
}
export function hostQueueAdd(movie: string): IHostQueueAddAction {
  return {
    type: HOST_QUEUE_ADD,
    movie
  };
}

// hostQueueDelete triggerd from the UI and removes a movie from the queue
// No remote
export interface IHostQueueDeleteAction extends IAction {
  movie: string;
}
export function isHostQueueDeleteAction(action: IAction ): action is IHostQueueDeleteAction {
  return action.type === HOST_QUEUE_DELETE;
}
export function hostQueueDelete(movie: string): IHostQueueDeleteAction {
  return {
    type: HOST_QUEUE_DELETE,
    movie
  };
}

// hostStart triggered from UI and moves to monitor mode
// Broadcasts REMOTE_HOST_READY
export interface IHostStartAction extends IAction {
}
export function isHostStartAction(action: IAction ): action is IHostStartAction {
  return action.type === HOST_START;
}
export function hostStart(): IAction {
  return {
    type: HOST_START
  };
}

// REMOTE_HOST_READY is triggered be the remote host and provides host's name and the first two movies
export interface IRemoteHostReadyAction extends IAction {
  hostName: string,
  movieA: string,
  movieB: string
}
export function isRemoteHostReadyAction(action: IAction ): action is IRemoteHostReadyAction {
  return action.type === REMOTE_HOST_READY;
}
export function remoteHostReady(hostName: string, movieA: string, movieB: string): IRemoteHostReadyAction {
  return {
    type: REMOTE_HOST_READY,
    hostName,
    movieA,
    movieB
  };
}

// REMOTE_VOTE_RECEVIED is triggered from participants onto monitor
export interface IRemoteVoteReceivedAction extends IAction {
  movie: string;
}
export function isRemoteVoteReceivedAction(action: IAction ): action is IRemoteVoteReceivedAction {
  return action.type === REMOTE_VOTE_RECEIVED;
}
export function remoteVoteReceived (movie: string): IRemoteVoteReceivedAction {
  return {
    type: REMOTE_VOTE_RECEIVED,
    movie
  };
}

// REMOTE_NEXT is triggered on client by host
export interface IRemoteNextAction extends IAction {
  movieA: string,
  movieB: string
}
export function isRemoteNextAction(action: IAction ): action is IRemoteNextAction {
  return action.type === REMOTE_NEXT;
}
export function remoteNext(movieA: string, movieB: string): IRemoteNextAction {
  return {
    type: REMOTE_NEXT,
    movieA,
    movieB
  };
}

// REMOTE_WINNER triggered on clients by host (instead of next)
export interface IRemoteWinnerAction extends IAction {
  movie: string
}
export function isRemoteWinnerAction(action: IAction ): action is IRemoteWinnerAction {
  return action.type === REMOTE_WINNER;
}
export function remoteWinner(movie: string): IRemoteWinnerAction {
  return {
    type: REMOTE_WINNER,
    movie
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

export type TActionCreator = {
  join: (name?: string) => IJoinAction;
  vote: (movie: string) => IVoteAction;
  next: () => IAction;
  startSetup: (name?: string) => IStartSetupAction;
  hostQueueAdd: (movie: string) => IHostQueueAddAction;
  hostQueueDelete: (movie: string) => IHostQueueDeleteAction;
  hostStart: () => IAction;
  remoteHostReady: (hostName: string, movieA: string, movieB: string) => IRemoteHostReadyAction;
  remoteVoteReceived: (movie: string) => IRemoteVoteReceivedAction;
  remoteNext: (movieA: string, movieB: string) => IRemoteNextAction;
  remoteWinner: (movie: string) => IRemoteWinnerAction;
}
