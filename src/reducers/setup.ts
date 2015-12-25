import {
  isHostStartAction, isHostQueueAddAction, isHostQueueDeleteAction,
  IAction
} from "../actionCreators";
import { setup, monitor } from "../stateCreators";
import { RootData } from "../rootData";
import { broadcastRemoteHostReady } from "../socket";

export function setupReducer(s: RootData, action: IAction): RootData {

  if (isHostStartAction(action)) {
    if (s.queue.length >= 2) {
      broadcastRemoteHostReady(s.name, s.queue[0], s.queue[1]);
      return monitor(s.name, s.queue[0], s.queue[1], s.queue.slice(2));
    }
  } else if (isHostQueueAddAction(action)) {
    if (action.movie && s.queue.indexOf(action.movie) === -1) {
      return setup(s.name, s.queue.concat(action.movie));
    }
  } else if (isHostQueueDeleteAction(action)) {
    if (action.movie && s.queue.indexOf(action.movie) > -1) {
      // function notPayload(x: string): boolean { return x !== action.payload; }
      return setup(s.name, s.queue.filter(x => x !== action.movie));
    }
  }

  return s;
}
