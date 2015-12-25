/* @flow */

// Props and reducer definitions for winner mode

import { PropTypes } from "react";

import {
  isNextAction, isRemoteVoteReceivedAction, isRemoteWinnerAction,
  IAction
} from  "../actionCreators";

import { TMovieAppProps } from "./rootReducer";
import { mkWinner } from "./winner";
import { broadcastRemoteWinner, broadcastRemoteNext } from "../socket";

import { MonitorProps } from "../components/Monitor";

function promoteMonitor(m: MonitorProps): TMovieAppProps {
  return {
    mode: "MONITOR",
    monitor: m
  };
}

export function mkMonitor(name: string, movieA: string, movieB: string, queue: string[], scoreA: number = 0, scoreB: number = 0): TMovieAppProps {
  return promoteMonitor( { name, movieA, movieB, queue, scoreA, scoreB } );
}

export function unwrapMonitor(s: TMovieAppProps): MonitorProps {
  if (s.mode === "MONITOR") {
    return s.monitor;
  } else {
    throw new Error("Failed in unwrapMonitor, mode was " + s.mode);
  }
}

export function monitorReducer(m: MonitorProps, action: IAction): TMovieAppProps {

if (isNextAction(action)) {
  let newQueue: string[] = [];
  if (m.scoreA > m.scoreB) {
    newQueue = m.queue.concat(m.movieA);
  } else if (m.scoreA === m.scoreB) {
    newQueue = m.queue.concat(m.movieA, m.movieB);
  } else {
    newQueue = m.queue.concat(m.movieB);
  }
  if (newQueue.length === 1) {
    broadcastRemoteWinner(newQueue[0]);
    return mkWinner(m.name, null, newQueue[0], null, null);
  } else if (newQueue.length >= 2) {
    broadcastRemoteNext(newQueue[0], newQueue[1]);
    return mkMonitor(m.name, newQueue[0], newQueue[1], newQueue.slice(2), 0, 0);
  }
} else if (isRemoteVoteReceivedAction(action)) {
  if (action.movie) {
    if (action.movie === m.movieA) {
      return mkMonitor(m.name, m.movieA, m.movieB, m.queue, m.scoreA + 1, m.scoreB);
    } else if (action.movie === m.movieB) {
      return mkMonitor(m.name, m.movieA, m.movieB, m.queue, m.scoreA, m.scoreB + 1);
    }
  }
}
return promoteMonitor(m);
}
