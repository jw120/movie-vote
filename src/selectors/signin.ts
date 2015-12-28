import { IRootData } from "../rootData";

export interface ISigninPropData {
   hostName?: string;
   movieA?:   string;
   movieB?:   string
}

export function signinSelector(s: IRootData): { signin: ISigninPropData } {
  return {
    signin: {
      hostName: s.hostName,
      movieA: s.movieA,
      movieB: s.movieB
    }
  }
}
