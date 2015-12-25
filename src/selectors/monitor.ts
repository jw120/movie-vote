import { RootData } from "../rootData";

export interface MonitorPropData {
   name: string;
   movieA: string;
   movieB: string;
   queue: string[];
   scoreA: number;
   scoreB: number;
}

export function monitorSelector(s: RootData): { monitor: MonitorPropData } {
  return {
    monitor: {
      name: s.hostName,
      movieA: s.movieA,
      movieB: s.movieB,
      queue: s.queue,
      scoreA: s.scoreA,
      scoreB: s.scoreB
    }
  };
}
