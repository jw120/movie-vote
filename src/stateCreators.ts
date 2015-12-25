import { RootData } from "./rootData";
import { SIGNIN, SETUP, MONITOR, VOTING, WINNER } from "./stateTypes";

export function signin(hostName?: string, movieA?: string, movieB?: string): RootData {
  return {
    mode: SIGNIN,
    hostName, movieA, movieB
  };
}

export function voting(name: string, hostName: string, movieA: string, movieB: string, voted: string): RootData {
  return {
    mode: SETUP,
    name, hostName, movieA, movieB, voted
  };
}

export function setup(name: string, queue: string[]): RootData {
  return {
    mode: SETUP,
    queue
  };
}

export function monitor(name: string, movieA: string, movieB: string, queue: string[], scoreA: number = 0, scoreB: number = 0): RootData {
  return {
    mode: MONITOR,
    name, movieA, movieB, queue, scoreA, scoreB
  };
}

export function winner(name: string, hostName: string, winner: string, movieA: string, movieB: string): RootData {
  return {
    mode: WINNER,
    name, hostName, winner, movieA, movieB
  };
}
