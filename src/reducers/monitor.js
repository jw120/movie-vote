/* @flow */

// State and reducer definitions for winner mode

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
