
import { createSelector } from "reselect";
import { RootData } from "../rootData";

export interface SigninPropData {
   hostName: string;
   movieA:   string;
   movieB:   string
}

export function signinSelector(s: StoreState): { signin: SigninPropData } {
  return {
    signin: {
      hostName: s.hostName,
      movieA: s.movieA,
      movieB: s.movieB
    }
  }
}
