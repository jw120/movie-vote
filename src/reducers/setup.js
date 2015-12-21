/* @flow */

// Props and reducer definitions for setup mode

import { PropTypes } from "react";

import {
  HOST_START, HOST_QUEUE_ADD, HOST_QUEUE_DELETE, REMOTE_HOST_READY
} from "../actionTypes";

import type { TAction } from "../actionCreators";
import type { TMovieAppProps } from "./rootReducer";

import { mkMonitor } from "./monitor";
import { broadcast } from "../socket";

export type TSetupProps = {
   name: string,
   queue: string[]
}

export const SetupPropTypes = {
  name:  PropTypes.string.isRequired,
  queue: PropTypes.arrayOf(PropTypes.string).isRequired
};

function promoteSetup(s: TSetupProps): TMovieAppProps {
  return {
    mode: "SETUP",
    setup: s
  };
}

export function mkSetup(name: string, queue: string[]): TMovieAppProps {
  return promoteSetup( { name, queue } );
}

export function unwrapSetup(s: TMovieAppProps): TSetupProps {
  if (s.mode === "SETUP") {
    return s.setup;
  } else {
    throw new Error("Failed in unwrapSetup, mode was " + s.mode);
  }
}

export function setupReducer(s: TSetupProps, action: TAction): TMovieAppProps {

  switch (action.type) {

    case HOST_START:
      if (s.queue.length >= 2) {
        broadcast(REMOTE_HOST_READY, s.name, s.queue[0], s.queue[1]);
        return mkMonitor(s.name, s.queue[0], s.queue[1], s.queue.slice(2));
      }
      break;

    case HOST_QUEUE_ADD:
      if (typeof action.payload === "string" && action.payload && s.queue.indexOf(action.payload) === -1) {
        return mkSetup(s.name, s.queue.concat(action.payload));
      }
      break;

    case HOST_QUEUE_DELETE:
      if (typeof action.payload === "string" && action.payload && s.queue.indexOf(action.payload) > -1) {
        function notPayload(x: string): boolean { return x !== action.payload; }
        return mkSetup(s.name, s.queue.filter(notPayload));
      }
      break;

  }

  return promoteSetup(s);
}
