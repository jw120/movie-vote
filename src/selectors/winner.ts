import { IRootData } from "../rootData";

export interface IWinnerPropData {
  hostName?: string;
  movieA?: string;
  movieB?: string;
  winner: string;
}

export function winnerSelector(s: IRootData): IWinnerPropData {
  return {
    hostName: s.hostName,
    movieA: s.movieA,
    movieB: s.movieB,
    winner: s.winner
  };
}
