/* @flow */

export type TVote = {
    voter: string,
    movie: string
}

export type TAction = {
    type: string,
    payload?: string | TVote
};

import {
    JOIN, VOTE, NEXT,
    HOST_START_SETUP, HOST_START, HOST_QUEUE_ADD, HOST_QUEUE_DELETE,
    REMOTE_HOST_READY, REMOTE_VOTE_RECEVIED, REMOTE_RESET
} from "./ActionTypes";

export function join(name: string): TAction {
    return {
        type: JOIN,
        payload: name
    };
}

export function vote(movie: string): TAction {
    return {
        type: VOTE,
        payload: movie
    };
}

export function next(): TAction {
    return {
        type: NEXT
    };
}

export function hostStartSetup(name: string): TAction {
    return {
        type: HOST_START_SETUP,
        payload: name
    };
}

export function hostQueueAdd(movie: string): TAction {
    return {
        type: HOST_QUEUE_ADD,
        payload: movie
    };
}

export function hostQueueDelete(movie: string): TAction {
    return {
        type: HOST_QUEUE_DELETE,
        payload: movie
    };
}

export function hostStart(): TAction {
    return {
        type: HOST_START
    };
}

export function remoteHostReady(hostName: string): TAction {
    return {
        type: REMOTE_HOST_READY,
        payload: hostName
    };
}

export function remoteVoteReceived (voter: string, movie: string): TAction {
    return {
        type: REMOTE_VOTE_RECEVIED,
        payload: { voter, movie }
    };
}

export function remoteReset(): TAction {
    return {
        type: REMOTE_RESET
    };
}

export default {
    join,
    vote,
    next,
    hostStartSetup,
    hostStart,
    hostQueueAdd,
    hostQueueDelete,
    remoteHostReady,
    remoteVoteReceived,
    remoteReset
};
