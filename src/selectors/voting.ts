import { RootData } from "../rootData";

export interface VotingPropData {
  name: string,
  hostName: string,
  movieA: string,
  movieB: string,
  voted?: string
}

export function votingSelector(s: RootData): { voting: VotingPropData } {
  return {
    voting: {
      name: s.name,
      hostName: s.hostName,
      movieA: s.movieA,
      movieB: s.movieB,
      voted: s.voted
    }
  };
}
