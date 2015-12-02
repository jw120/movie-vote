/* eslint-env mocha */

import { expect } from "chai";

import actionCreators from "../../src/actionCreators";
import reducer from "../../src/reducers/reducer";

import { mkWinner } from "../../src/reducers/winner";
import { mkMonitor } from "../../src/reducers/monitor";

describe("monitor reducer", () => {

  it("NEXT with 3 in queue  updates", () => {
    const s = mkMonitor("sid", "m1", "m2", ["m3", "m4", "m5"], 5, 2);
    const a = actionCreators.next();
    const x = mkMonitor("sid", "m3", "m4", ["m5", "m1"], 0, 0);
    expect(reducer(s, a)).to.deep.equal(x);
  });
  it("NEXT with 2 in queue and A ahead updates", () => {
    const s = mkMonitor("sid", "m1", "m2", ["m3", "m4"], 3, 2);
    const a = actionCreators.next();
    const x = mkMonitor("sid", "m3", "m4", ["m1"], 0, 0);
    expect(reducer(s, a)).to.deep.equal(x);
  });
  it("NEXT with 2 in queue and B ahead updates", () => {
    const s = mkMonitor("sid", "m1", "m2", ["m3", "m4"], 0, 2);
    const a = actionCreators.next();
    const x = mkMonitor("sid", "m3", "m4", ["m2"], 0, 0);
    expect(reducer(s, a)).to.deep.equal(x);
  });
  it("NEXT with 2 in queue and tie updates", () => {
    const s = mkMonitor("sid", "m1", "m2", ["m3", "m4"], 3, 3);
    const a = actionCreators.next();
    const x = mkMonitor("sid", "m3", "m4", ["m1", "m2"], 0, 0);
    expect(reducer(s, a)).to.deep.equal(x);
  });
  it("NEXT with 1 in queue and A ahead updates", () => {
    const s = mkMonitor("sid", "m1", "m2", ["m3"], 3, 2);
    const a = actionCreators.next();
    const x = mkMonitor("sid", "m3", "m1", [], 0, 0);
    expect(reducer(s, a)).to.deep.equal(x);
  });
  it("NEXT with 1 in queue and B ahead updates", () => {
    const s = mkMonitor("sid", "m1", "m2", ["m3"], 0, 2);
    const a = actionCreators.next();
    const x = mkMonitor("sid", "m3", "m2", [], 0, 0);
    expect(reducer(s, a)).to.deep.equal(x);
  });
  it("NEXT with 1 in queue and tie updates", () => {
    const s = mkMonitor("sid", "m1", "m2", ["m3"], 3, 3);
    const a = actionCreators.next();
    const x = mkMonitor("sid", "m3", "m1", ["m2"], 0, 0);
    expect(reducer(s, a)).to.deep.equal(x);
  });
  it("NEXT with 0 in queue and A ahead gives winner", () => {
    const s = mkMonitor("sid", "m1", "m2", [], 3, 2);
    const a = actionCreators.next();
    const x = mkWinner("sid", null, "m1", null, null);
    expect(reducer(s, a)).to.deep.equal(x);
  });
  it("NEXT with 0 in queue and B ahead gives winner", () => {
    const s = mkMonitor("sid", "m1", "m2", [], 0, 2);
    const a = actionCreators.next();
    const x = mkWinner("sid", null, "m2", null, null);
    expect(reducer(s, a)).to.deep.equal(x);
  });
  it("NEXT with 0 in queue and tie updates", () => {
    const s = mkMonitor("sid", "m1", "m2", [], 3, 3);
    const a = actionCreators.next();
    const x = mkMonitor("sid", "m1", "m2", [], 0, 0);
    expect(reducer(s, a)).to.deep.equal(x);
  });

  it("REMOTE_VOTE_RECEVIED with valid A vote", () => {
    const s = mkMonitor("sid", "m1", "m2", ["q1"], 3, 3);
    const a = actionCreators.remoteVoteReceived("m1");
    const x = mkMonitor("sid", "m1", "m2", ["q1"], 4, 3);
    expect(reducer(s, a)).to.deep.equal(x);
  });
  it("REMOTE_VOTE_RECEVIED with valid B vote", () => {
    const s = mkMonitor("sid", "m1", "m2", ["q1"], 3, 3);
    const a = actionCreators.remoteVoteReceived("m2");
    const x = mkMonitor("sid", "m1", "m2", ["q1"], 3, 4);
    expect(reducer(s, a)).to.deep.equal(x);
  });
  it("REMOTE_VOTE_RECEVIED ignores an invalid vote", () => {
    const s = mkMonitor("sid", "m1", "m2", ["q1"], 3, 3);
    const a = actionCreators.remoteVoteReceived("m3");
    expect(reducer(s, a)).to.deep.equal(s);
  });
  it("REMOTE_VOTE_RECEVIED ignores a missing vote", () => {
    const s = mkMonitor("sid", "m1", "m2", ["q1"], 3, 3);
    const a = actionCreators.remoteVoteReceived();
    expect(reducer(s, a)).to.deep.equal(s);
  });
  it("REMOTE_VOTE_RECEVIED ignores an empty vote", () => {
    const s = mkMonitor("sid", "m1", "m2", ["q1"], 3, 3);
    const a = actionCreators.remoteVoteReceived("");
    expect(reducer(s, a)).to.deep.equal(s);
  });
  it("REMOTE_VOTE_RECEVIED ignores a null vote", () => {
    const s = mkMonitor("sid", "m1", "m2", ["q1"], 3, 3);
    const a = actionCreators.remoteVoteReceived(null);
    expect(reducer(s, a)).to.deep.equal(s);
  });

});
