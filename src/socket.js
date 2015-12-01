/* @flow */

export function broadcastHostReady() {
  console.log("Broadcast host ready");
}

export function broadcastVote(movie: string) {
  console.log("Broadcast vote", movie);
}
