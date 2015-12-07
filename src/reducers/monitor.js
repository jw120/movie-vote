/* @flow */

// State and reducer definitions for winner mode

import {
  NEXT, REMOTE_VOTE_RECEVIED
} from "../actionTypes";

import type { TAction } from "../actionCreators";
import type { TState } from "./reducer";
import { mkWinner } from "./winner";

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

export function unwrapMonitor(s: TState): TMonitorState {
  if (s.mode === "MONITOR") {
    return s.monitor;
  } else {
    throw new Error("Failed in unwrapMonitor, mode was " + s.mode);
  }
}

export function monitorReducer(m: TMonitorState, action: TAction): TState {

  switch (action.type) {

    case NEXT:
      let newQueue: string[] = [];
      if (m.scoreA > m.scoreB) {
        newQueue = m.queue.concat(m.movieA);
      } else if (m.scoreA === m.scoreB) {
        newQueue = m.queue.concat(m.movieA, m.movieB);
      } else {
        newQueue = m.queue.concat(m.movieB);
      }
      if (newQueue.length === 1) {
        return mkWinner(m.name, null, newQueue[0], null, null);
      } else if (newQueue.length >= 2) {
        return mkMonitor(m.name, newQueue[0], newQueue[1], newQueue.slice(2), 0, 0);
      }
      break;

    case REMOTE_VOTE_RECEVIED:
      if (typeof action.payload === "string" && action.payload) {
        if (action.payload === m.movieA) {
          return mkMonitor(m.name, m.movieA, m.movieB, m.queue, m.scoreA + 1, m.scoreB);
        } else if (action.payload === m.movieB) {
          return mkMonitor(m.name, m.movieA, m.movieB, m.queue, m.scoreA, m.scoreB + 1);
        }
      }
      break;

  }

  return promoteMonitor(m);
}
