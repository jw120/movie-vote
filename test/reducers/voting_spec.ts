import * as expect from "expect";

import { vote, remoteNext, remoteWinner, IAction } from "../../src/actionCreators";
import { REMOTE_VOTE_RECEIVED } from "../../src/actionTypes";
import { voting, winner } from "../../src/stateCreators";
import frozenRootReducer from "../frozenRootReducer";
import { IRootData } from "../../src/rootData";

import mock from "../mocks";
import { initSocketClient } from "../../src/socket";
initSocketClient(mock.store, mock.io);

describe("voting reducer", () => {

  it("VOTE sets voted with a valid movieA", () => {
    const s: IRootData = voting({ }, "alice", "host", "m1", "m2", null);
    const a: IAction = vote("m1");
    const x: IRootData = voting({ }, "alice", "host", "m1", "m2", "m1");
    expect(frozenRootReducer(s, a)).toEqual(x);
  });

  it("VOTE sets voted with a valid movieB", () => {
    const s: IRootData = voting({ }, "alice", "host", "m1", "m2", null);
    const a: IAction = vote("m2");
    const x: IRootData = voting({ }, "alice", "host", "m1", "m2", "m2");
    expect(frozenRootReducer(s, a)).toEqual(x);
  });

  it("VOTE requests broadcast of REMOTE_VOTE_RECEIVED", () => {
    const s: IRootData = voting({ }, "alice", "host", "m1", "m2", null);
    const a: IAction = vote("m1");
    mock.reset();
    frozenRootReducer(s, a);
    expect(mock.emitted[0]).toEqual(["broadcast-request", REMOTE_VOTE_RECEIVED, "m1"]);
  });

  it("VOTE ignores an invalid movie", () => {
    const s: IRootData = voting({ }, "alice", "host", "m1", "m2", null);
    const a: IAction = vote("m3");
    expect(frozenRootReducer(s, a)).toEqual(s);
  });

  it("VOTE ignores a second vote", () => {
    const s: IRootData = voting({ }, "alice", "host", "m1", "m2", "m1");
    const a: IAction = vote("m2");
    expect(frozenRootReducer(s, a)).toEqual(s);
  });

  it("REMOTE_NEXT changes movies", () => {
    const s: IRootData = voting({ }, "alice", "host", "m1", "m2", null);
    const a: IAction = remoteNext("m3", "m4");
    const x: IRootData = voting({ }, "alice", "host", "m3", "m4", null);
    expect(frozenRootReducer(s, a)).toEqual(x);
  });

  it("REMOTE_NEXT resets voted flag", () => {
    const s: IRootData = voting({ }, "alice", "host", "m1", "m2", "m1");
    const a: IAction = remoteNext("m3", "m4");
    const x: IRootData = voting({ }, "alice", "host", "m3", "m4", null);
    expect(frozenRootReducer(s, a)).toEqual(x);
  });

  it("REMOTE_NEXT ignores missing movie", () => {
    const s: IRootData = voting({ }, "alice", "host", "m1", "m2", "m1");
    const a: IAction = remoteNext("m3", undefined);
    expect(frozenRootReducer(s, a)).toEqual(s);
  });

  it("REMOTE_NEXT ignores empty movie", () => {
    const s: IRootData = voting({ }, "alice", "host", "m1", "m2", "m1");
    const a: IAction = remoteNext("m3", "");
    expect(frozenRootReducer(s, a)).toEqual(s);
  });

  it("REMOTE_WINNER changes mode", () => {
    const s: IRootData = voting({ }, "alice", "host", "m1", "m2", null);
    const a: IAction = remoteWinner("m1");
    const x: IRootData = winner(s, "alice", null, "m1", null, null);
    expect(frozenRootReducer(s, a)).toEqual(x);
  });

  it("REMOTE_WINNER ignores a missing winner", () => {
    const s: IRootData = voting({ }, "alice", "host", "m1", "m2", null);
    const a: IAction = remoteWinner(undefined);
    expect(frozenRootReducer(s, a)).toEqual(s);
  });

  it("REMOTE_WINNER ignores a null winner", () => {
    const s: IRootData = voting({ }, "alice", "host", "m1", "m2", null);
    const a: IAction = remoteWinner(null);
    expect(frozenRootReducer(s, a)).toEqual(s);
  });

  it("REMOTE_WINNER ignores an empty winner", () => {
    const s: IRootData = voting({ }, "alice", "host", "m1", "m2", null);
    const a: IAction = remoteWinner("");
    expect(frozenRootReducer(s, a)).toEqual(s);
  });

});
