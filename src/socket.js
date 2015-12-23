/* @flow */

import * as actionTypes from "./actionTypes";
import actionCreators from "./actionCreators";

declare module "debug" {
  declare function debug(): any;
}
const Debug = require("debug");
const d = Debug("mvc:socket");

let sic = require("socket.io-client");

let io: any = undefined;

export function initSocketClient(store: any) {
  io = sic("http://127.0.0.1:8003");
  d("io set to", io);
  io.on(actionTypes.REMOTE_NEXT, (a: string, b: string) => {
    d("Received", actionTypes.REMOTE_NEXT);
    store.dispatch(actionCreators.remoteNext(a, b));
  });
  io.on(actionTypes.REMOTE_WINNER, (w: string) => {
    d("Received",  actionTypes.REMOTE_WINNER);
    store.dispatch(actionCreators.remoteWinner(w));
  });
  io.on(actionTypes.REMOTE_HOST_READY, (h: string, a: string, b: string) => {
    d("Received", actionTypes.REMOTE_HOST_READY);
    store.dispatch(actionCreators.remoteHostReady(h, a, b));
  });
  io.on(actionTypes.REMOTE_VOTE_RECEVIED, (v: string) => {
    d("Received", actionTypes.REMOTE_VOTE_RECEVIED);
    store.dispatch(actionCreators.remoteVoteReceived(v));
  });
}

export function broadcast(action: string, ...params: any[]) {
  d("Broadcasting", action, ...params);
  io.emit("broadcast-request", action, ...params);
}
