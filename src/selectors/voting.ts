import { IRootData } from "../rootData";

export interface IVotingPropData {
  name: string;
  hostName: string;
  movieA: string;
  movieB: string;
  voted?: string;
}

export function votingSelector(s: IRootData): IVotingPropData {
  return {
    name: s.name,
    hostName: s.hostName,
    movieA: s.movieA,
    movieB: s.movieB,
    voted: s.voted
  };
}
