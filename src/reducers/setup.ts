/* @flow */

// Props and reducer definitions for setup mode

import { PropTypes } from "react";

import {
  HOST_START, HOST_QUEUE_ADD, HOST_QUEUE_DELETE, REMOTE_HOST_READY
} from "../actionTypes";
import {
  isHostStartAction, isHostQueueAddAction, isHostQueueDeleteAction,
  IAction
} from "../actionCreators";
import { TMovieAppProps } from "./rootReducer";

import { mkMonitor } from "./monitor";
import { broadcastRemoteHostReady } from "../socket";

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

export function setupReducer(s: TSetupProps, action: IAction): TMovieAppProps {

  if (isHostStartAction(action)) {
    if (s.queue.length >= 2) {
      broadcastRemoteHostReady(s.name, s.queue[0], s.queue[1]);
      return mkMonitor(s.name, s.queue[0], s.queue[1], s.queue.slice(2));
    }
  } else if (isHostQueueAddAction(action)) {
    if (action.movie && s.queue.indexOf(action.movie) === -1) {
      return mkSetup(s.name, s.queue.concat(action.movie));
    }
  } else if (isHostQueueDeleteAction(action)) {
    if (action.movie && s.queue.indexOf(action.movie) > -1) {
      // function notPayload(x: string): boolean { return x !== action.payload; }
      return mkSetup(s.name, s.queue.filter(x => x !== action.movie));
    }
  }

  return promoteSetup(s);
}
