/* eslint-env mocha */
/* @flow */

import { expect } from "chai";

import actionCreators from "../../src/actionCreators";
import reducer from "../../src/reducers/reducer";

import { mkSetup } from "../../src/reducers/setup";
import { mkMonitor } from "../../src/reducers/monitor";

describe("setup reducer", () => {

// HOST_START -> monitor (and broadcasts)
  it("HOST_START triggers monitor mode with 3 in queue", () => {
    const s = mkSetup("bob", ["a", "b", "c"]);
    const a = actionCreators.hostStart();
    const x = mkMonitor("bob", "a", "b", ["c"], 0, 0);
    expect(reducer(s, a)).to.deep.equal(x);
  });
  it("HOST_START triggers monitor mode with 2 in queue", () => {
    const s = mkSetup("bob", ["a", "b"]);
    const a = actionCreators.hostStart();
    const x = mkMonitor("bob", "a", "b", [], 0, 0);
    expect(reducer(s, a)).to.deep.equal(x);
  });
  it("HOST_START does nothing if nothing in quque", () => {
    const s = mkSetup("bob", []);
    const a = actionCreators.hostStart();
    expect(reducer(s, a)).to.deep.equal(s);
  });
  it("HOST_START does nothing if only one movie in queue", () => {
    const s = mkSetup("bob", []);
    const a = actionCreators.hostStart();
    expect(reducer(s, a)).to.deep.equal(s);
  });

  it("HOST_QUEUE_ADD adds a valid movie", () => {
    const s = mkSetup("bob", ["a", "b", "c"]);
    const a = actionCreators.hostQueueAdd("d");
    const x = mkSetup("bob", ["a", "b", "c", "d"]);
    expect(reducer(s, a)).to.deep.equal(x);
  });
  it("HOST_QUEUE_ADD ignores a duplicate movie", () => {
    const s = mkSetup("bob", ["a", "b", "c"]);
    const a = actionCreators.hostQueueAdd("c");
    expect(reducer(s, a)).to.deep.equal(s);
  });
  it("HOST_QUEUE_ADD ignores a missing movie", () => {
    const s = mkSetup("bob", ["a", "b", "c"]);
    const a = actionCreators.hostQueueAdd();
    expect(reducer(s, a)).to.deep.equal(s);
  });
  it("HOST_QUEUE_ADD ignores a null movie", () => {
    const s = mkSetup("bob", ["a", "b", "c"]);
    const a = actionCreators.hostQueueAdd(null);
    expect(reducer(s, a)).to.deep.equal(s);
  });
  it("HOST_QUEUE_ADD ignores an empty movie", () => {
    const s = mkSetup("bob", ["a", "b", "c"]);
    const a = actionCreators.hostQueueAdd("");
    expect(reducer(s, a)).to.deep.equal(s);
  });

  it("HOST_QUEUE_DELETE removes a valid movie", () => {
    const s = mkSetup("bob", ["a", "b", "c"]);
    const a = actionCreators.hostQueueDelete("b");
    const x = mkSetup("bob", ["a", "c"]);
    expect(reducer(s, a)).to.deep.equal(x);
  });
  it("HOST_QUEUE_DELETE ignores a new movie", () => {
    const s = mkSetup("bob", ["a", "b", "c"]);
    const a = actionCreators.hostQueueDelete("d");
    expect(reducer(s, a)).to.deep.equal(s);
  });
  it("HOST_QUEUE_DELETE ignores a missing movie", () => {
    const s = mkSetup("bob", ["a", "b", "c"]);
    const a = actionCreators.hostQueueDelete();
    expect(reducer(s, a)).to.deep.equal(s);
  });
  it("HOST_QUEUE_DELETE ignores a null movie", () => {
    const s = mkSetup("bob", ["a", "b", "c"]);
    const a = actionCreators.hostQueueDelete(null);
    expect(reducer(s, a)).to.deep.equal(s);
  });
  it("HOST_QUEUE_DELETE ignores an empty movie", () => {
    const s = mkSetup("bob", ["a", "b", "c"]);
    const a = actionCreators.hostQueueDelete("");
    expect(reducer(s, a)).to.deep.equal(s);
  });

});
