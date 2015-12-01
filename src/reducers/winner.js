/* @flow */

// State and reducer definitions for winner mode

import type { TState } from "./reducer";

export type TWinnerState = {
   name: string,
   hostName: string,
   winner: string
}

function promoteWinner(w: TWinnerState): TState {
  return {
    mode: "WINNER",
    winner: w
  };
}

export function mkWinner(name: string, hostName: string, winner: string): TState {
  return promoteWinner( { name, hostName, winner } );
}
