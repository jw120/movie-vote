/* @flow */

import { REMOTE_HOST_READY, REMOTE_VOTE_RECEIVED,  REMOTE_NEXT, REMOTE_WINNER } from "./actionTypes";
import { remoteNext, remoteWinner, remoteHostReady, remoteVoteReceived} from "./actionCreators";

import * as Debug from "debug";
const d = Debug("mvc:socket");

let myIO: {
  emit: Function;
  on: Function;
} = undefined;

export function initSocketClient(store: any, io:any) {
  myIO = io;
  d("Set myIO:", myIO);
  myIO.on(REMOTE_NEXT, (a: string, b: string) => {
    d("Received", REMOTE_NEXT);
    store.dispatch(remoteNext(a, b));
  });
  myIO.on(REMOTE_WINNER, (w: string) => {
    d("Received", REMOTE_WINNER);
    store.dispatch(remoteWinner(w));
  });
  myIO.on(REMOTE_HOST_READY, (h: string, a: string, b: string) => {
    d("Received", REMOTE_HOST_READY);
    store.dispatch(remoteHostReady(h, a, b));
  });
  myIO.on(REMOTE_VOTE_RECEIVED, (v: string) => {
    d("Received", REMOTE_VOTE_RECEIVED);
    store.dispatch(remoteVoteReceived(v));
  });
}

export function broadcastRemoteNext(movieA: string, movieB: string) {
  d("Broadcasting REMOTE_NEXT", REMOTE_NEXT, movieA, movieB);
  myIO.emit("broadcast-request", REMOTE_NEXT, movieA, movieB);
}

export function broadcastRemoteWinner(movie: string) {
  d("Broadcasting REMOTE_WINNER", REMOTE_WINNER, movie);
  myIO.emit("broadcast-request", REMOTE_WINNER, movie);
}

export function broadcastRemoteHostReady(hostName: string, movieA: string, movieB: string) {
    d("Broadcasting REMOTE_HOST_READY", REMOTE_HOST_READY, hostName, movieA, movieB);
  myIO.emit("broadcast-request", REMOTE_HOST_READY, hostName, movieA, movieB);
}

export function broadcastRemoteVoteReceived(movie: string) {
  d("Broadcasting REMOTE_VOTE_RECEVIED", REMOTE_VOTE_RECEIVED, movie);
  myIO.emit("broadcast-request", REMOTE_VOTE_RECEIVED, movie);
}
