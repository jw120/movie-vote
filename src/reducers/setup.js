/* @flow */

// State and reducer definitions for setup mode

import {
  HOST_START, HOST_QUEUE_ADD, HOST_QUEUE_DELETE
} from "../actionTypes";

import type { TState } from "./reducer";

export type TSetupState = {
   name: string,
   queue: string[]
}

function promoteSignin(s: TSetupState): TState {
  return {
    mode: "SETUP",
    setup: s
  };
}

export function mkSetup(name: string, queue: string[]): TState {
  return promoteSignin( { name, queue } );
}
