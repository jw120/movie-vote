import { IRootData } from "./rootData";
import { SIGNIN, SETUP, MONITOR, VOTING, WINNER } from "./stateTypes";

export function signin(hostName?: string, movieA?: string, movieB?: string): IRootData {
  return {
    mode: SIGNIN,
    hostName, movieA, movieB
  };
}

export function voting(name: string, hostName: string, movieA: string, movieB: string, voted: string): IRootData {
  return {
    mode: VOTING,
    name, hostName, movieA, movieB, voted
  };
}

export function setup(name: string, queue: string[]): IRootData {
  return {
    mode: SETUP,
    name, queue
  };
}

export function monitor(
  name: string, movieA: string, movieB: string, queue: string[], scoreA: number = 0, scoreB: number = 0
): IRootData {
  return {
    mode: MONITOR,
    name, movieA, movieB, queue, scoreA, scoreB
  };
}

export function winner(name: string, hostName: string, winner: string, movieA: string, movieB: string): IRootData {
  return {
    mode: WINNER,
    name, hostName, winner, movieA, movieB
  };
}
