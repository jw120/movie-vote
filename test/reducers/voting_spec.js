/* eslint-env mocha */

import { expect } from "chai";

import actionCreators from "../../src/actionCreators";
import reducer from "../../src/reducers/reducer";

import { mkVoting } from "../../src/reducers/voting";
import { mkWinner } from "../../src/reducers/winner";

describe("voting reducer", () => {

  it("VOTE sets voted with a valid movieA", () => {
    const s = mkVoting("alice", "host", "m1", "m2", null);
    const a = actionCreators.vote("m1");
    const x = mkVoting("alice", "host", "m1", "m2", "m1");
    expect(reducer(s, a)).to.deep.equal(x);
  });

  it("VOTE sets voted with a valid movieB", () => {
    const s = mkVoting("alice", "host", "m1", "m2", null);
    const a = actionCreators.vote("m2");
    const x = mkVoting("alice", "host", "m1", "m2", "m2");
    expect(reducer(s, a)).to.deep.equal(x);
  });

  it("VOTE ignores an invalid movie", () => {
    const s = mkVoting("alice", "host", "m1", "m2", null);
    const a = actionCreators.vote("m3");
    expect(reducer(s, a)).to.deep.equal(s);
  });

  it("VOTE ignores a second vote", () => {
    const s = mkVoting("alice", "host", "m1", "m2", "m1");
    const a = actionCreators.vote("m2");
    expect(reducer(s, a)).to.deep.equal(s);
  });

  it("REMOTE_NEXT changes movies", () => {
    const s = mkVoting("alice", "host", "m1", "m2", null);
    const a = actionCreators.remoteNext("m3", "m4");
    const x = mkVoting("alice", "host", "m3", "m4", null);
    expect(reducer(s, a)).to.deep.equal(x);
  });

  it("REMOTE_NEXT resets voted flag", () => {
    const s = mkVoting("alice", "host", "m1", "m2", "m1");
    const a = actionCreators.remoteNext("m3", "m4");
    const x = mkVoting("alice", "host", "m3", "m4", null);
    expect(reducer(s, a)).to.deep.equal(x);
  });

  it("REMOTE_NEXT ignores missing movie", () => {
    const s = mkVoting("alice", "host", "m1", "m2", "m1");
    const a = actionCreators.remoteNext("m3");
    expect(reducer(s, a)).to.deep.equal(s);
  });

  it("REMOTE_NEXT ignores empty movie", () => {
    const s = mkVoting("alice", "host", "m1", "m2", "m1");
    const a = actionCreators.remoteNext("m3", "");
    expect(reducer(s, a)).to.deep.equal(s);
  });

  it("REMOTE_WINNER changes mode", () => {
    const s = mkVoting("alice", "host", "m1", "m2", null);
    const a = actionCreators.remoteWinner("m3");
    const x = mkWinner("alice", "host", "m3");
    expect(reducer(s, a)).to.deep.equal(x);
  });

  it("REMOTE_WINNER ignores a missing winner", () => {
    const s = mkVoting("alice", "host", "m1", "m2", null);
    const a = actionCreators.remoteWinner();
    expect(reducer(s, a)).to.deep.equal(s);
  });

  it("REMOTE_WINNER ignores a null winner", () => {
    const s = mkVoting("alice", "host", "m1", "m2", null);
    const a = actionCreators.remoteWinner(null);
    expect(reducer(s, a)).to.deep.equal(s);
  });

  it("REMOTE_WINNER ignores an empty winner", () => {
    const s = mkVoting("alice", "host", "m1", "m2", null);
    const a = actionCreators.remoteWinner("");
    expect(reducer(s, a)).to.deep.equal(s);
  });

});
