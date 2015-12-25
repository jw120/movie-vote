
import { createSelector } from "reselect";
import { StoreState } from "../storeState";

export interface StartupProps {
   hostName: string;
   movieA:   string;
   movieB:   string
}

export function startupSelector(s: StoreState): StartupProps {
  return {
    hostName: s.hostName,
    movieA: s.movieA,
    movieB: s.movieB
  }
}
