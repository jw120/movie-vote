import { REMOTE_HOST_READY, REMOTE_VOTE_RECEIVED,  REMOTE_NEXT, REMOTE_WINNER } from "./actionTypes";
import { remoteNext, remoteWinner, remoteHostReady, remoteVoteReceived} from "./actionCreators";

let myIO: {
  emit: Function;
  on: Function;
} = undefined;

export function initSocketClient(store: any, io: any): void {
  myIO = io;
  myIO.on(REMOTE_NEXT, (a: string, b: string) => {
    store.dispatch(remoteNext(a, b));
  });
  myIO.on(REMOTE_WINNER, (w: string) => {
    store.dispatch(remoteWinner(w));
  });
  myIO.on(REMOTE_HOST_READY, (h: string, a: string, b: string) => {
    store.dispatch(remoteHostReady(h, a, b));
  });
  myIO.on(REMOTE_VOTE_RECEIVED, (v: string) => {
    store.dispatch(remoteVoteReceived(v));
  });
}

export function broadcastRemoteNext(movieA: string, movieB: string): void {
  myIO.emit("broadcast-request", REMOTE_NEXT, movieA, movieB);
}

export function broadcastRemoteWinner(movie: string): void {
  myIO.emit("broadcast-request", REMOTE_WINNER, movie);
}

export function broadcastRemoteHostReady(hostName: string, movieA: string, movieB: string): void {
  myIO.emit("broadcast-request", REMOTE_HOST_READY, hostName, movieA, movieB);
}

export function broadcastRemoteVoteReceived(movie: string): void {
  myIO.emit("broadcast-request", REMOTE_VOTE_RECEIVED, movie);
}
