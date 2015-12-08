/* @flow */

// State and reducer definitions for setup mode

import { propTypes } from "react";

import {
  HOST_START, HOST_QUEUE_ADD, HOST_QUEUE_DELETE
} from "../actionTypes";

import type { TAction } from "../actionCreators";
import type { TState } from "./reducer";

import { mkMonitor } from "./monitor";

export type TSetupState = {
   name: string,
   queue: string[]
}

export const SetupPropTypes = {
  name: propTypes.string.isRequired,
  queue: propTypes.arraryOf(propTypes.string).isRequired
};

function promoteSetup(s: TSetupState): TState {
  return {
    mode: "SETUP",
    setup: s
  };
}

export function mkSetup(name: string, queue: string[]): TState {
  return promoteSetup( { name, queue } );
}

export function unwrapSetup(s: TState): TSetupState {
  if (s.mode === "SETUP") {
    return s.setup;
  } else {
    throw new Error("Failed in unwrapSetup, mode was " + s.mode);
  }
}

export function setupReducer(s: TSetupState, action: TAction): TState {

  switch (action.type) {

    case HOST_START:
      if (s.queue.length >= 2) {
        return mkMonitor(s.name, s.queue[0], s.queue[1], s.queue.slice(2));
      }
      break;

    case HOST_QUEUE_ADD:
      if (typeof action.payload === "string" && action.payload && s.queue.indexOf(action.payload) === -1) {
        return promoteSetup({
          ...s,
          queue: s.queue.concat(action.payload)
        });
      }
      break;

    case HOST_QUEUE_DELETE:
      if (typeof action.payload === "string" && action.payload && s.queue.indexOf(action.payload) > -1) {
        return promoteSetup({
          ...s,
          queue: s.queue.filter(x => x !== action.payload)
        });
      }
      break;

  }

  return promoteSetup(s);
}
