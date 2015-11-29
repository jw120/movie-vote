import {
    JOIN, VOTE, NEXT,
    HOST_START_SETUP, HOST_START, HOST_QUEUE_ADD, HOST_QUEUE_DELETE,
    REMOTE_HOST_READY, REMOTE_VOTE_RECEVIED, REMOTE_RESET
} from "./actionTypes";

export const join = (name) => ({
    type: JOIN,
    payload: name
});

export const vote = (movie) => ({
    type: VOTE,
    payload: movie
});

export const next = () => ({
    type: NEXT
});

export const hostStartSetup = (name) => ({
    type: HOST_START_SETUP,
    payload: name
});

export const hostQueueAdd = (movie) => ({
    type: HOST_QUEUE_ADD,
    payload: movie
});

export const hostQueueDelete = (movie) => ({
    type: HOST_QUEUE_DELETE,
    payload: movie
});

export const hostStart = () => ({
    type: HOST_START
});

export const remoteHostReady = (hostName) => ({
    type: REMOTE_HOST_READY,
    payload: hostName
});

export const remoteVoteReceived = (voter, movie) => ({
    type: REMOTE_VOTE_RECEVIED,
    payload: { voter, movie }
});

export const remoteReset = () => ({
    type: REMOTE_RESET
});

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
