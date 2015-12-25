import {
  isJoinAction, isStartSetupAction, isRemoteHostReadyAction,
  IAction
} from "../actionCreators";

import { RootData } from "../RootData";
import { signin, voting, setup } from "../stateCreators";

export function signinReducer(s: RootData, action: IAction): RootData {

  if (isJoinAction(action)) {
    if (s.hostName && action.name && s.movieA && s.movieB) {
      return voting(action.name, s.hostName, s.movieA, s.movieB, null);
    }
  } else if (isStartSetupAction(action)) {
    if (action.name) {
      return setup(action.name, []);
    }
  } else if (isRemoteHostReadyAction(action)) {
    if (action.hostName && action.movieA && action.movieB) {
      return signin(action.hostName, action.movieA, action.movieB);
    }
  }
  return s;

}
