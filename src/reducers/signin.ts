import {
  isJoinAction, isStartSetupAction, isRemoteHostReadyAction,
  IAction
} from "../actionCreators";

import { IRootData } from "../RootData";
import { signin, voting, setup } from "../stateCreators";

export function signinReducer(s: IRootData, action: IAction): IRootData {

  if (isJoinAction(action)) {
    if (s.hostName && action.name && s.movieA && s.movieB) {
      return voting(s, action.name, s.hostName, s.movieA, s.movieB, null);
    }
  } else if (isStartSetupAction(action)) {
    if (action.name) {
      return setup(s, action.name, []);
    }
  } else if (isRemoteHostReadyAction(action)) {
    if (action.hostName && action.movieA && action.movieB) {
      return signin(s, action.hostName, action.movieA, action.movieB);
    }
  }
  return s;

}
