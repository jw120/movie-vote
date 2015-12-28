import { IRootData, addToRootData } from "./rootData";
import { SIGNIN, SETUP, MONITOR, VOTING, WINNER } from "./stateTypes";

export function signin(s: IRootData, hostName?: string, movieA?: string, movieB?: string): IRootData {
  return addToRootData(s, {
    mode: SIGNIN,
    hostName, movieA, movieB
  });
}

export function voting(
  s: IRootData, name: string, hostName: string, movieA: string, movieB: string, voted: string
): IRootData {
  return addToRootData(s, {
    mode: VOTING,
    name, hostName, movieA, movieB, voted
  });
}

export function setup(s: IRootData, name: string, queue: string[]): IRootData {
  return addToRootData(s, {
    mode: SETUP,
    name, queue
  });
}

export function monitor(s: IRootData,
  name: string, movieA: string, movieB: string, queue: string[], scoreA: number = 0, scoreB: number = 0
): IRootData {
  return addToRootData(s, {
    mode: MONITOR,
    name, movieA, movieB, queue, scoreA, scoreB
  });
}

export function winner(
  s: IRootData, name: string, hostName: string, winner: string, movieA: string, movieB: string
): IRootData {
  return addToRootData(s, {
    mode: WINNER,
    name, hostName, winner, movieA, movieB
  });
}
