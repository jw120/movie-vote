import { IRootData } from "../rootData";

export interface ISigninPropData {
   hostName?: string;
   movieA?:   string;
   movieB?:   string;
}

export function signinSelector(s: IRootData): ISigninPropData {
  return {
    hostName: s.hostName,
    movieA: s.movieA,
    movieB: s.movieB,
  }
}
