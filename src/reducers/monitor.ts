import { isNextAction, isRemoteVoteReceivedAction, IAction } from  "../actionCreators";
import { monitor, winner } from "../stateCreators";
import { IRootData } from "../RootData";
import { broadcastRemoteWinner, broadcastRemoteNext } from "../socket";

export function monitorReducer(m: IRootData, action: IAction): IRootData {

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
      return winner(m, m.name, null, newQueue[0], null, null);
    } else {
      broadcastRemoteNext(newQueue[0], newQueue[1]);
      return monitor(m, m.name, newQueue[0], newQueue[1], newQueue.slice(2), 0, 0);
    }
  } else if (isRemoteVoteReceivedAction(action)) {
    if (action.movie) {
      if (action.movie === m.movieA) {
        return monitor(m, m.name, m.movieA, m.movieB, m.queue, m.scoreA + 1, m.scoreB);
      } else if (action.movie === m.movieB) {
        return monitor(m, m.name, m.movieA, m.movieB, m.queue, m.scoreA, m.scoreB + 1);
      }
    }
  }
  return m;
}
