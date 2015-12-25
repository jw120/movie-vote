import { RootData } from "../rootData";

export interface WinnerPropData {
  hostName?: string,
  movieA?: string,
  movieB?: string,
  winner: string
}

export function winnerSelector(s: RootData): { winner: WinnerPropData } {
  return {
    winner: {
      hostName: s.hostName,
      winner: s.winner
    }
  };
}
