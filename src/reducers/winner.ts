import {
  isJoinAction, isStartSetupAction, isRemoteHostReadyAction,
  IAction
} from "../actionCreators";
import { winner, voting, setup } from "../stateCreators";
import { RootData } from "../rootData";

export function winnerReducer(w: RootData, action: IAction): RootData {

  if (isJoinAction(action)) {
    if (w.hostName && w.movieA && w.movieB) {
      return voting(w.name, w.hostName, w.movieA, w.movieB, null);
    }
  } else if (isStartSetupAction(action)) {
    return setup(w.name, []);
  } else if (isRemoteHostReadyAction(action)) {
    if (action.hostName && action.movieA && action.movieB) {
      return winner(w.name, action.hostName, w.winner, action.movieA, action.movieB);
    }
  }

  return w;
}
