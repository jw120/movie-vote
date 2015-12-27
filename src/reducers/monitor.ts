import { PropTypes } from "react";

import {
  isNextAction, isRemoteVoteReceivedAction, isRemoteWinnerAction,
  IAction
} from  "../actionCreators";
import { monitor, winner } from "../stateCreators";
import { RootData } from "../RootData";
import { broadcastRemoteWinner, broadcastRemoteNext } from "../socket";

export function monitorReducer(m: RootData, action: IAction): RootData {

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
      return winner(m.name, null, newQueue[0], null, null);
    } else {
      broadcastRemoteNext(newQueue[0], newQueue[1]);
      return monitor(m.name, newQueue[0], newQueue[1], newQueue.slice(2), 0, 0);
    }
  } else if (isRemoteVoteReceivedAction(action)) {
    if (action.movie) {
      if (action.movie === m.movieA) {
        return monitor(m.name, m.movieA, m.movieB, m.queue, m.scoreA + 1, m.scoreB);
      } else if (action.movie === m.movieB) {
        return monitor(m.name, m.movieA, m.movieB, m.queue, m.scoreA, m.scoreB + 1);
      }
    }
  }
  return m;
}
