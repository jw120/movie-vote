import { expect } from "chai";

import { vote, remoteNext, remoteWinner } from "../../src/actionCreators";
import { voting, winner } from "../../src/stateCreators";
import rootReducer from "../../src/reducers/rootReducer";

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
    const a = remoteWinner("m3");
    const x = winner("alice", null, "m3", null, null);
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
