import { expect } from "chai";

import { next, remoteVoteReceived, hostQueueAdd } from "../../src/actionCreators";
import { REMOTE_NEXT, REMOTE_WINNER } from "../../src/actionTypes";
import { winner, monitor } from "../../src/stateCreators";
import frozenRootReducer from "../frozenRootReducer";

import mock from "../mocks";
import { initSocketClient } from "../../src/socket";
initSocketClient(mock.store, mock.io);

describe("monitor reducer", () => {

  it("NEXT with 4 in queue updates", () => {
    const s = monitor("sid", "m1", "m2", ["m3", "m4", "m5", "m6"], 5, 2);
    const a = next();
    const x = monitor("sid", "m3", "m4", ["m5", "m6", "m1"], 0, 0);
    expect(frozenRootReducer(s, a)).to.deep.equal(x);
  });
  it("NEXT with 3 in queue updates", () => {
    const s = monitor("sid", "m1", "m2", ["m3", "m4", "m5"], 5, 2);
    const a = next();
    const x = monitor("sid", "m3", "m4", ["m5", "m1"], 0, 0);
    expect(frozenRootReducer(s, a)).to.deep.equal(x);
  });
  it("NEXT with 2 in queue and A ahead updates", () => {
    const s = monitor("sid", "m1", "m2", ["m3", "m4"], 3, 2);
    const a = next();
    const x = monitor("sid", "m3", "m4", ["m1"], 0, 0);
    expect(frozenRootReducer(s, a)).to.deep.equal(x);
  });
  it("NEXT with 2 in queue and B ahead updates", () => {
    const s = monitor("sid", "m1", "m2", ["m3", "m4"], 0, 2);
    const a = next();
    const x = monitor("sid", "m3", "m4", ["m2"], 0, 0);
    expect(frozenRootReducer(s, a)).to.deep.equal(x);
  });
  it("NEXT with 2 in queue and tie updates", () => {
    const s = monitor("sid", "m1", "m2", ["m3", "m4"], 3, 3);
    const a = next();
    const x = monitor("sid", "m3", "m4", ["m1", "m2"], 0, 0);
    expect(frozenRootReducer(s, a)).to.deep.equal(x);
  });
  it("NEXT with 1 in queue and A ahead updates", () => {
    const s = monitor("sid", "m1", "m2", ["m3"], 3, 2);
    const a = next();
    const x = monitor("sid", "m3", "m1", [], 0, 0);
    expect(frozenRootReducer(s, a)).to.deep.equal(x);
  });
  it("NEXT with 1 in queue and B ahead updates", () => {
    const s = monitor("sid", "m1", "m2", ["m3"], 0, 2);
    const a = next();
    const x = monitor("sid", "m3", "m2", [], 0, 0);
    expect(frozenRootReducer(s, a)).to.deep.equal(x);
  });
  it("NEXT with 1 in queue and tie updates", () => {
    const s = monitor("sid", "m1", "m2", ["m3"], 3, 3);
    const a = next();
    const x = monitor("sid", "m3", "m1", ["m2"], 0, 0);
    expect(frozenRootReducer(s, a)).to.deep.equal(x);
  });
  it("NEXT with 0 in queue and A ahead gives winner", () => {
    const s = monitor("sid", "m1", "m2", [], 3, 2);
    const a = next();
    const x = winner("sid", null, "m1", null, null);
    expect(frozenRootReducer(s, a)).to.deep.equal(x);
  });
  it("NEXT with 0 in queue and B ahead gives winner", () => {
    const s = monitor("sid", "m1", "m2", [], 0, 2);
    const a = next();
    const x = winner("sid", null, "m2", null, null);
    expect(frozenRootReducer(s, a)).to.deep.equal(x);
  });
  it("NEXT with 0 in queue and tie updates", () => {
    const s = monitor("sid", "m1", "m2", [], 3, 3);
    const a = next();
    const x = monitor("sid", "m1", "m2", [], 0, 0);
    expect(frozenRootReducer(s, a)).to.deep.equal(x);
  });
  it("NEXT requests broadcast of REMOTE_NEXT", () => {
    const s = monitor("sid", "m1", "m2", ["m3"], 3, 3);
    const a = next();
    mock.reset();
    frozenRootReducer(s, a);
    expect(mock.emitted[0]).to.deep.equal(["broadcast-request", REMOTE_NEXT, "m3", "m1"]);
  });
  it("NEXT requests broadcast of REMOTE_WINNER", () => {
    const s = monitor("sid", "m1", "m2", [], 3, 4);
    const a = next();
    mock.reset();
    frozenRootReducer(s, a);
    expect(mock.emitted[0]).to.deep.equal(["broadcast-request", REMOTE_WINNER, "m2"]);
  });

  it("REMOTE_VOTE_RECEVIED with valid A vote", () => {
    const s = monitor("sid", "m1", "m2", ["q1"], 3, 3);
    const a = remoteVoteReceived("m1");
    const x = monitor("sid", "m1", "m2", ["q1"], 4, 3);
    expect(frozenRootReducer(s, a)).to.deep.equal(x);
  });
  it("REMOTE_VOTE_RECEVIED with valid B vote", () => {
    const s = monitor("sid", "m1", "m2", ["q1"], 3, 3);
    const a = remoteVoteReceived("m2");
    const x = monitor("sid", "m1", "m2", ["q1"], 3, 4);
    expect(frozenRootReducer(s, a)).to.deep.equal(x);
  });
  it("REMOTE_VOTE_RECEVIED ignores an invalid vote", () => {
    const s = monitor("sid", "m1", "m2", ["q1"], 3, 3);
    const a = remoteVoteReceived("m3");
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });
  it("REMOTE_VOTE_RECEVIED ignores a missing vote", () => {
    const s = monitor("sid", "m1", "m2", ["q1"], 3, 3);
    const a = remoteVoteReceived(undefined);
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });
  it("REMOTE_VOTE_RECEVIED ignores an empty vote", () => {
    const s = monitor("sid", "m1", "m2", ["q1"], 3, 3);
    const a = remoteVoteReceived("");
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });
  it("REMOTE_VOTE_RECEVIED ignores a null vote", () => {
    const s = monitor("sid", "m1", "m2", ["q1"], 3, 3);
    const a = remoteVoteReceived(null);
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });

  it("HOST_QUEUE_ADD passed through", () => {
    const s = monitor("sid", "m1", "m2", ["q1"], 3, 3);
    const a = hostQueueAdd("m");
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });

});
