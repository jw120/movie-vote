import { expect } from "chai";

import { vote, remoteNext, remoteWinner } from "../../src/actionCreators";
import { REMOTE_VOTE_RECEIVED } from "../../src/actionTypes";
import { voting, winner } from "../../src/stateCreators";
import rootReducer from "../../src/reducers/rootReducer";

import mock from "../mocks";
import { initSocketClient } from "../../src/socket";
initSocketClient(mock.store, mock.io);

describe("voting reducer", () => {

  it("VOTE sets voted with a valid movieA", () => {
    const s = voting("alice", "host", "m1", "m2", null);
    const a = vote("m1");
    const x = voting("alice", "host", "m1", "m2", "m1");
    expect(rootReducer(s, a)).to.deep.equal(x);
  });

  it("VOTE sets voted with a valid movieB", () => {
    const s = voting("alice", "host", "m1", "m2", null);
    const a = vote("m2");
    const x = voting("alice", "host", "m1", "m2", "m2");
    expect(rootReducer(s, a)).to.deep.equal(x);
  });

  it("VOTE emits a broadcast request for REMOTE_VOTE_RECEIVED", () => {
    const s = voting("alice", "host", "m1", "m2", null);
    const a = vote("m1");
    mock.reset();
    rootReducer(s, a);
    expect(mock.emitted[0]).to.deep.equal(["broadcast-request", REMOTE_VOTE_RECEIVED, "m1"]);
  });

  it("VOTE ignores an invalid movie", () => {
    const s = voting("alice", "host", "m1", "m2", null);
    const a = vote("m3");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("VOTE ignores a second vote", () => {
    const s = voting("alice", "host", "m1", "m2", "m1");
    const a = vote("m2");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("REMOTE_NEXT changes movies", () => {
    const s = voting("alice", "host", "m1", "m2", null);
    const a = remoteNext("m3", "m4");
    const x = voting("alice", "host", "m3", "m4", null);
    expect(rootReducer(s, a)).to.deep.equal(x);
  });

  it("REMOTE_NEXT resets voted flag", () => {
    const s = voting("alice", "host", "m1", "m2", "m1");
    const a = remoteNext("m3", "m4");
    const x = voting("alice", "host", "m3", "m4", null);
    expect(rootReducer(s, a)).to.deep.equal(x);
  });

  it("REMOTE_NEXT ignores missing movie", () => {
    const s = voting("alice", "host", "m1", "m2", "m1");
    const a = remoteNext("m3", undefined);
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("REMOTE_NEXT ignores empty movie", () => {
    const s = voting("alice", "host", "m1", "m2", "m1");
    const a = remoteNext("m3", "");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("REMOTE_WINNER changes mode", () => {
    const s = voting("alice", "host", "m1", "m2", null);
    const a = remoteWinner("m1");
    const x = winner("alice", null, "m1", null, null);
    expect(rootReducer(s, a)).to.deep.equal(x);
  });

  it("REMOTE_WINNER ignores a missing winner", () => {
    const s = voting("alice", "host", "m1", "m2", null);
    const a = remoteWinner(undefined);
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("REMOTE_WINNER ignores a null winner", () => {
    const s = voting("alice", "host", "m1", "m2", null);
    const a = remoteWinner(null);
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("REMOTE_WINNER ignores an empty winner", () => {
    const s = voting("alice", "host", "m1", "m2", null);
    const a = remoteWinner("");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

});
