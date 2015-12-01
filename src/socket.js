/* @flow */

declare module "debug" {
  declare function debug(): any;
}


const Debug = require("debug");
const d = Debug("mvc:socket");

export function broadcastHostReady() {
  d("Broadcast host ready");
}

export function broadcastVote(movie: string) {
  d("Broadcast vote", movie);
}
