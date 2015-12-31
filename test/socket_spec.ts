import * as expect from "expect";

import { remoteNext, remoteHostReady, remoteWinner, remoteVoteReceived } from "../src/actionCreators";
import { REMOTE_NEXT, REMOTE_WINNER, REMOTE_HOST_READY, REMOTE_VOTE_RECEIVED } from "../src/actionTypes";
import { broadcastRemoteNext, broadcastRemoteWinner, broadcastRemoteHostReady,
         broadcastRemoteVoteReceived } from "../src/socket";
import { initSocketClient } from "../src/socket";
import mock from "./mocks";
initSocketClient(mock.store, mock.io);

describe("socket library", () => {

  it("provides broadcast methods", () => {
    mock.reset();
    broadcastRemoteNext("a", "b");
    broadcastRemoteWinner("c");
    broadcastRemoteHostReady("h", "a", "b");
    broadcastRemoteVoteReceived("v");
    expect(mock.emitted).toEqual([
      ["broadcast-request", REMOTE_NEXT, "a", "b"],
      ["broadcast-request", REMOTE_WINNER, "c"],
      ["broadcast-request", REMOTE_HOST_READY, "h", "a", "b"],
      ["broadcast-request", REMOTE_VOTE_RECEIVED, "v"]
    ]);
  });

  it("sets up REMOTE_NEXT handler to dispatch remoteNext", () => {
    mock.reset();
    mock.io.test(REMOTE_NEXT, "a", "b");
    expect(mock.dispatched).toEqual([remoteNext("a", "b")]);
  });

  it("sets up REMOTE_WINNER handler to dispatch remoteWinner", () => {
    mock.reset();
    mock.io.test(REMOTE_WINNER, "w");
    expect(mock.dispatched).toEqual([remoteWinner("w")]);
  });

  it("sets up REMOTE_HOST_READY handler to dispatch remoteHostReady", () => {
    mock.reset();
    mock.io.test(REMOTE_HOST_READY, "h", "a", "b");
    expect(mock.dispatched).toEqual([remoteHostReady("h", "a", "b")]);
  });

  it("sets up REMOTE_VOTE_RECEIVED handler to dispatch remoteVoteReceived", () => {
    mock.reset();
    mock.io.test(REMOTE_VOTE_RECEIVED, "v");
    expect(mock.dispatched).toEqual([remoteVoteReceived("v")]);
  });

});
