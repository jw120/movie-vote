import { isHostStartAction, isHostQueueAddAction, isHostQueueDeleteAction, IAction } from "../actionCreators";
import { setup, monitor } from "../stateCreators";
import { IRootData } from "../rootData";
import { broadcastRemoteHostReady } from "../socket";

export function setupReducer(s: IRootData, action: IAction): IRootData {

  if (isHostStartAction(action)) {

    if (s.queue.length >= 2) {
      broadcastRemoteHostReady(s.name, s.queue[0], s.queue[1]);
      return monitor(s, s.name, s.queue[0], s.queue[1], s.queue.slice(2));
    }

  } else if (isHostQueueAddAction(action)) {

    if (action.movie && s.queue.indexOf(action.movie) === -1) {
      return setup(s, s.name, s.queue.concat(action.movie));
    }

  } else if (isHostQueueDeleteAction(action)) {

    if (action.movie && s.queue.indexOf(action.movie) > -1) {
      return setup(s, s.name, s.queue.filter((x: string) => x !== action.movie));
    }

  }

  return s;
}
