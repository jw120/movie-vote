import { IAction } from "../actionCreators";
import { signin } from "../stateCreators";

import { IRootData } from "../rootData";

import { signinReducer } from "./signin";
import { votingReducer } from "./voting";
import { monitorReducer } from "./monitor";
import { setupReducer } from "./setup";
import { winnerReducer } from "./winner";

import { SIGNIN, VOTING, MONITOR, SETUP, WINNER } from "../stateTypes";

export default function rootReducer(state: IRootData = signin(), action: IAction): IRootData {
  switch (state.mode) {
    case SIGNIN:
      return signinReducer(state, action);
    case VOTING:
      return votingReducer(state, action);
    case SETUP:
      return setupReducer(state, action);
    case MONITOR:
      return monitorReducer(state, action);
    case WINNER:
      return winnerReducer(state, action);
    default:
      return state;
  }
}
