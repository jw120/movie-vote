/* eslint-env mocha */
/* @flow */

import { expect } from "chai";

import actionCreators from "../../src/actionCreators";
import rootReducer from "../../src/reducers/rootReducer";

import { mkVoting } from "../../src/reducers/voting";
import { mkWinner } from "../../src/reducers/winner";

describe("voting reducer", () => {

  it("VOTE sets voted with a valid movieA", () => {
    const s = mkVoting("alice", "host", "m1", "m2", null);
    const a = actionCreators.vote("m1");
    const x = mkVoting("alice", "host", "m1", "m2", "m1");
    expect(rootReducer(s, a)).to.deep.equal(x);
  });

  it("VOTE sets voted with a valid movieB", () => {
    const s = mkVoting("alice", "host", "m1", "m2", null);
    const a = actionCreators.vote("m2");
    const x = mkVoting("alice", "host", "m1", "m2", "m2");
    expect(rootReducer(s, a)).to.deep.equal(x);
  });

  it("VOTE ignores an invalid movie", () => {
    const s = mkVoting("alice", "host", "m1", "m2", null);
    const a = actionCreators.vote("m3");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("VOTE ignores a second vote", () => {
    const s = mkVoting("alice", "host", "m1", "m2", "m1");
    const a = actionCreators.vote("m2");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("REMOTE_NEXT changes movies", () => {
    const s = mkVoting("alice", "host", "m1", "m2", null);
    const a = actionCreators.remoteNext("m3", "m4");
    const x = mkVoting("alice", "host", "m3", "m4", null);
    expect(rootReducer(s, a)).to.deep.equal(x);
  });

  it("REMOTE_NEXT resets voted flag", () => {
    const s = mkVoting("alice", "host", "m1", "m2", "m1");
    const a = actionCreators.remoteNext("m3", "m4");
    const x = mkVoting("alice", "host", "m3", "m4", null);
    expect(rootReducer(s, a)).to.deep.equal(x);
  });

  it("REMOTE_NEXT ignores missing movie", () => {
    const s = mkVoting("alice", "host", "m1", "m2", "m1");
    const a = actionCreators.remoteNext("m3");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("REMOTE_NEXT ignores empty movie", () => {
    const s = mkVoting("alice", "host", "m1", "m2", "m1");
    const a = actionCreators.remoteNext("m3", "");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("REMOTE_WINNER changes mode", () => {
    const s = mkVoting("alice", "host", "m1", "m2", null);
    const a = actionCreators.remoteWinner("m3");
    const x = mkWinner("alice", null, "m3", null, null);
    expect(rootReducer(s, a)).to.deep.equal(x);
  });

  it("REMOTE_WINNER ignores a missing winner", () => {
    const s = mkVoting("alice", "host", "m1", "m2", null);
    const a = actionCreators.remoteWinner();
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("REMOTE_WINNER ignores a null winner", () => {
    const s = mkVoting("alice", "host", "m1", "m2", null);
    const a = actionCreators.remoteWinner(null);
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("REMOTE_WINNER ignores an empty winner", () => {
    const s = mkVoting("alice", "host", "m1", "m2", null);
    const a = actionCreators.remoteWinner("");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

});
