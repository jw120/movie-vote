import { IAction } from "../actionCreators";

import { IRootData } from "../rootData";

import { signinReducer } from "./signin";
import { votingReducer } from "./voting";
import { monitorReducer } from "./monitor";
import { setupReducer } from "./setup";
import { winnerReducer } from "./winner";

import { SIGNIN, VOTING, MONITOR, SETUP, WINNER, UNKNOWN } from "../stateTypes";

export default function rootReducer(state: IRootData = { mode: UNKNOWN }, action: IAction): IRootData {
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
