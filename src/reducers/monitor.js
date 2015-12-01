/* @flow */

// State and reducer definitions for winner mode

import {
  NEXT, REMOTE_VOTE_RECEVIED
} from "../actionTypes";

import type { TAction } from "../actionCreators";
import type { TState } from "./reducer";

export type TMonitorState = {
   name: string,
   movieA: string,
   movieB: string,
   queue: string[],
   scoreA: number,
   scoreB: number,
}

function promoteMonitor(m: TMonitorState): TState {
  return {
    mode: "MONITOR",
    monitor: m
  };
}

export function mkMonitor(name: string, movieA: string, movieB: string, queue: string[], scoreA: number = 0, scoreB: number = 0): TState {
  return promoteMonitor( { name, movieA, movieB, queue, scoreA, scoreB } );
}

export function monitorReducer(m: TMonitorState, action: TAction): TState {

  // switch (action.type) {

  //   case HOST_START:
  //     if (s.queue.length >= 2) {
  //       return mkMonitor(s.name, s.queue[0], s.queue[1], s.queue.slice(2));
  //     }
  //     break;
  //
  //   case HOST_QUEUE_ADD:
  //     if (typeof action.payload === "string" && action.payload && s.queue.indexOf(action.payload) === -1) {
  //       return promoteSetup({
  //         ...s,
  //         queue: s.queue.concat(action.payload)
  //       });
  //     }
  //     break;
  //
  //   case HOST_QUEUE_DELETE:
  //     if (typeof action.payload === "string" && action.payload && s.queue.indexOf(action.payload) > -1) {
  //       return promoteSetup({
  //         ...s,
  //         queue: s.queue.filter(x => x !== action.payload)
  //       });
  //     }
  //     break;
  //
  // }

  return promoteMonitor(m);
}
