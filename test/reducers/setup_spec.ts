import { expect } from "chai";

import { setup, monitor } from "../../src/stateCreators";
import { REMOTE_HOST_READY } from "../../src/actionTypes";
import { hostStart, hostQueueAdd, hostQueueDelete, remoteWinner, IAction } from "../../src/actionCreators";
import frozenRootReducer from "../frozenRootReducer";
import { IRootData } from "../../src/rootData";

import mock from "../mocks";
import { initSocketClient } from "../../src/socket";
initSocketClient(mock.store, mock.io);

describe("setup reducer", () => {

// HOST_START -> monitor (and broadcasts)
  it("HOST_START triggers monitor mode with 3 in queue", () => {
    const s: IRootData = setup("bob", ["a", "b", "c"]);
    const a: IAction = hostStart();
    const x: IRootData = monitor("bob", "a", "b", ["c"], 0, 0);
    expect(frozenRootReducer(s, a)).to.deep.equal(x);
  });
  it("HOST_START triggers monitor mode with 2 in queue", () => {
    const s: IRootData = setup("bob", ["a", "b"]);
    const a: IAction = hostStart();
    const x: IRootData = monitor("bob", "a", "b", [], 0, 0);
    expect(frozenRootReducer(s, a)).to.deep.equal(x);
  });
  it("HOST_START does nothing if nothing in quque", () => {
    const s: IRootData = setup("bob", []);
    const a: IAction = hostStart();
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });
  it("HOST_START does nothing if only one movie in queue", () => {
    const s: IRootData = setup("bob", []);
    const a: IAction = hostStart();
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });
  it("HOST_START requests broadcast of REMOTE_HOST_READY", () => {
    const s: IRootData = setup("bob", ["a", "b"]);
    const a: IAction = hostStart();
    mock.reset();
    frozenRootReducer(s, a);
    expect(mock.emitted[0]).to.deep.equal(["broadcast-request", REMOTE_HOST_READY, "bob", "a", "b"]);
  });

  it("HOST_QUEUE_ADD adds a valid movie", () => {
    const s: IRootData = setup("bob", ["a", "b", "c"]);
    const a: IAction = hostQueueAdd("d");
    const x: IRootData = setup("bob", ["a", "b", "c", "d"]);
    expect(frozenRootReducer(s, a)).to.deep.equal(x);
  });
  it("HOST_QUEUE_ADD ignores a duplicate movie", () => {
    const s: IRootData = setup("bob", ["a", "b", "c"]);
    const a: IAction = hostQueueAdd("c");
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });
  it("HOST_QUEUE_ADD ignores a missing movie", () => {
    const s: IRootData = setup("bob", ["a", "b", "c"]);
    const a: IAction = hostQueueAdd(undefined);
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });
  it("HOST_QUEUE_ADD ignores a null movie", () => {
    const s: IRootData = setup("bob", ["a", "b", "c"]);
    const a: IAction = hostQueueAdd(null);
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });
  it("HOST_QUEUE_ADD ignores an empty movie", () => {
    const s: IRootData = setup("bob", ["a", "b", "c"]);
    const a: IAction = hostQueueAdd("");
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });

  it("HOST_QUEUE_DELETE removes a valid movie", () => {
    const s: IRootData = setup("bob", ["a", "b", "c"]);
    const a: IAction = hostQueueDelete("b");
    const x: IRootData = setup("bob", ["a", "c"]);
    expect(frozenRootReducer(s, a)).to.deep.equal(x);
  });
  it("HOST_QUEUE_DELETE ignores a new movie", () => {
    const s: IRootData = setup("bob", ["a", "b", "c"]);
    const a: IAction = hostQueueDelete("d");
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });
  it("HOST_QUEUE_DELETE ignores a missing movie", () => {
    const s: IRootData = setup("bob", ["a", "b", "c"]);
    const a: IAction = hostQueueDelete(undefined);
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });
  it("HOST_QUEUE_DELETE ignores a null movie", () => {
    const s: IRootData = setup("bob", ["a", "b", "c"]);
    const a: IAction = hostQueueDelete(null);
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });
  it("HOST_QUEUE_DELETE ignores an empty movie", () => {
    const s: IRootData = setup("bob", ["a", "b", "c"]);
    const a: IAction = hostQueueDelete("");
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });

  it("REMOTE_WINNER passed through", () => {
    const s: IRootData = setup("bob", ["a", "b", "c"]);
    const a: IAction = remoteWinner("m");
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });

});
