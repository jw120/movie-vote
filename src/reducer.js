/* @flow */

import {
    JOIN, /* NEXT, */ VOTE,
    HOST_START_SETUP, HOST_START, HOST_QUEUE_ADD, HOST_QUEUE_DELETE, // HOST_RESET,
    REMOTE_HOST_READY // ,  REMOTE_VOTE_RECEVIED, REMOTE_RESET
} from "./ActionTypes";

import { broadcastHostReady } from "./socket";
import type { TAction } from "./actionCreators";

export type StateType = {
    mode: number,
    name?: string,
    hostName?: string,
    movieA?: string,
    movieB?: string,
    scoreA?: string,
    scoreB?: string,
    winner?: string,
    queue?: string[]
};

const Mode = {
    SIGNIN: 0,
    SETUP: 1,
    VOTING: 1,
    MONITOR: 2,
    WINNER: 3
};

const INITIAL_STATE: StateType = {
    mode: Mode.SIGNIN
};

export default function reducer(state: StateType = INITIAL_STATE, action: TAction): StateType {
    switch (state.mode) {
        case Mode.SIGNIN:   return signinReducer(state, action);
        case Mode.SETUP:    return setupReducer(state, action);
        case Mode.VOTING:   return votingReducer(state, action);
    }
    return state;
}


// Signin mode is ended by JOINing a vote hosted elsewhere or by offering to setup a vote
// Only state change possible is recognizing a remote host
function signinReducer(state: StateType, action: TAction): StateType {
    switch (action.type) {
        case JOIN:
            if (state.hostName && typeof action.payload === "string") {
                return {
                    ...state,
                    mode: Mode.VOTING,
                    name: action.payload
                };
            }
            break;
        case HOST_START_SETUP:
            if (typeof action.payload === "string") {
                return {
                    ...state,
                    mode: Mode.SETUP,
                    name: action.payload
                };
            }
            break;
        case REMOTE_HOST_READY:
            if (typeof action.payload === "string") {
                return {
                    ...state,
                    hostName: action.payload
                };
            }
            break;
    }
    return state;
}

// Setup mode is ended by HOST_START
// State change is from entry changes
function setupReducer(state: StateType, action: TAction): StateType {
    switch (action.type) {
        case HOST_START:
            if (state.queue && state.queue.length >= 2) {
                broadcastHostReady(state.name);
                return {
                    ...state,
                    mode: Mode.MONITOR
                };
            }
            break;
        case HOST_QUEUE_ADD:
            if (typeof action.payload === "string") {
                return {
                    ...state,
                    queue: state.queue ? state.queue.concat(action.payload) : [action.payload]
                };
            }
            break;
        case HOST_QUEUE_DELETE:
            if (typeof action.payload === "string") {
                return {
                    ...state,
                    queue: state.queue ? state.queue.filter(x => x !== action.payload) : state.queue
                };
            }
            break;
    }
    return state;
}

// Setup mode is ended by HOST_START
// State change is from entry changes
function votingReducer(state: StateType, action: TAction): StateType {
    switch (action.type) {
        case VOTE:
            if (typeof action.payload === "string") {
                return {
                    ...state,
                    voted: action.payload
                };
            }
    }
    return state;
}