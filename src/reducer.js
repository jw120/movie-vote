import Immutable from "seamless-immutable";

import {
    JOIN, // NEXT, VOTE,
    HOST_START_SETUP, HOST_START, HOST_QUEUE_ADD, HOST_QUEUE_DELETE, // HOST_RESET,
    REMOTE_HOST_READY // ,  REMOTE_VOTE_RECEVIED, REMOTE_RESET
} from "./actionTypes";

import { broadcastHostReady } from "./socket";

const Mode = Immutable({
    SIGNIN: 0,
    SETUP: 1,
    VOTING: 1,
    MONITOR: 2,
    WINNER: 3
});

const INITIAL_STATE = Immutable({
    mode: Mode.SIGNIN
});

export default function reducer(state = INITIAL_STATE, action) {
    switch (state.mode) {
        case Mode.SIGNIN: return signinReducer(state, action);
        case Mode.SETUP: return setupReducer(state, action);
    }
    return state;
}


// Signin mode is ended by JOINing a vote hosted elsewhere or by offering to setup a vote
// Only state change possible is recognizing a remote host
function signinReducer(state, action) {
    switch (action.type) {
        case JOIN:
            if (state.hostName) {
                return state.merge({
                    mode: Mode.VOTING,
                    name: action.payload
                });
            }
            break;
        case HOST_START_SETUP:
            return state.merge({
                mode: Mode.SETUP,
                name: action.payload
            });
        case REMOTE_HOST_READY:
            return state.merge({
                hostName: action.payload
            });
    }
    return state;
}

// Setup mode is ended by HOST_START
// State change is from entry changes
function setupReducer(state, action) {
    switch (action.type) {
        case HOST_START:
            if (state.queue && state.queue.length >= 2) {
                broadcastHostReady(state.name);
                return state.merge({
                    mode: Mode.Monitor
                });
            }
            break;
        case HOST_QUEUE_ADD:
            return state.merge({
                queue: state.queue ? state.queue.concat(action.payload) : [action.payload]
            });
        case HOST_QUEUE_DELETE:
            return state.merge({
                queue: state.queue ? state.queue.filter(x => x !== action.payload) : state.queue
            });

    }
    return state;
}