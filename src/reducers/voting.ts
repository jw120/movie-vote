import { isVoteAction, isRemoteNextAction, isRemoteWinnerAction, IAction } from "../actionCreators";
import { voting, winner } from "../stateCreators";
import { broadcastRemoteVoteReceived } from "../socket";

import { IRootData } from "../rootData";

export function votingReducer(v: IRootData, action: IAction): IRootData {

  if (isVoteAction(action)) {

    if ((action.movie === v.movieA || action.movie === v.movieB) && !v.voted) {
      broadcastRemoteVoteReceived(action.movie);
      return voting(v, v.name, v.hostName, v.movieA, v.movieB, action.movie);
    }

  } else if (isRemoteNextAction(action)) {

    if (action.movieA && action.movieB) {
      return voting(v, v.name, v.hostName, action.movieA, action.movieB, null);
    }

  } else if (isRemoteWinnerAction(action)) {

    if (action.movie === v.movieA || action.movie === v.movieB) {
      return winner(v, v.name, null, action.movie, null, null);
    }

  }

  return v;
}
