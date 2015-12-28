export interface IRootData {
//   mode: string;
//   name: string;
//   hostName: string;
//   movieA: string;
//   movieB: string;
//   scoreA: number;
//   scoreB: number;
//   voted: string;
//   winner: string;
//   queue: string[];
//   onJoin: (name: string) => void;
//   onStartSetup: (name: string) => void;
// }
//
// export interface IPartialRootData {
  mode?: string;
  name?: string;
  hostName?: string;
  movieA?: string;
  movieB?: string;
  scoreA?: number;
  scoreB?: number;
  voted?: string;
  winner?: string;
  queue?: string[];
  onJoin?: (name: string) => void;
  onStartSetup?: (name: string) => void;
  onAdd?: (movie: string) => void;
  onDelete?: (movie: string) => void;
  onStart?: () => void;
  onVote?: (movie: string) => void;
  onNext?: () => void;
  [propName: string]: any;
}

// Immutable update the rootData with new elements
export function addToRootData(s: IRootData, o: IRootData): IRootData {
  let r: IRootData = { };
  let x: string;
  for (x in s) {
    if (s.hasOwnProperty(x)) {
      r[x] = s[x];
    }
  }
  for (x in o) {
    if (o.hasOwnProperty(x)) {
      r[x] = o[x];
    }
  }
  return r;
}
