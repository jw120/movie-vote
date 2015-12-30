import { IRootData } from "../rootData";

export interface IMonitorPropData {
   name: string;
   movieA: string;
   movieB: string;
   queue: string[];
   scoreA: number;
   scoreB: number;
}

export function monitorSelector(s: IRootData): IMonitorPropData {
  return {
    name: s.name,
    movieA: s.movieA,
    movieB: s.movieB,
    queue: s.queue,
    scoreA: s.scoreA,
    scoreB: s.scoreB
  };
}
