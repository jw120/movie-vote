import { IRootData } from "../rootData";

export interface ISigninPropData {
   hostName?: string;
   movieA?:   string;
   movieB?:   string;
   onJoin: (name: string) => void;
   onStartSetup: (name: string) => void;
}

export function signinSelector(s: IRootData): ISigninPropData {
  return {
    hostName: s.hostName,
    movieA: s.movieA,
    movieB: s.movieB,
    onJoin: s.onJoin,
    onStartSetup: s.onStartSetup
  }
}
