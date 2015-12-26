import { expect } from "chai";

import { setup, monitor } from "../../src/stateCreators";
import { hostStart, hostQueueAdd, hostQueueDelete } from "../../src/actionCreators";
import rootReducer from "../../src/reducers/rootReducer";

describe("setup reducer", () => {

// HOST_START -> monitor (and broadcasts)
  it("HOST_START triggers monitor mode with 3 in queue", () => {
    const s = setup("bob", ["a", "b", "c"]);
    const a = hostStart();
    const x = monitor("bob", "a", "b", ["c"], 0, 0);
    expect(rootReducer(s, a)).to.deep.equal(x);
  });
  it("HOST_START triggers monitor mode with 2 in queue", () => {
    const s = setup("bob", ["a", "b"]);
    const a = hostStart();
    const x = monitor("bob", "a", "b", [], 0, 0);
    expect(rootReducer(s, a)).to.deep.equal(x);
  });
  it("HOST_START does nothing if nothing in quque", () => {
    const s = setup("bob", []);
    const a = hostStart();
    expect(rootReducer(s, a)).to.deep.equal(s);
  });
  it("HOST_START does nothing if only one movie in queue", () => {
    const s = setup("bob", []);
    const a = hostStart();
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("HOST_QUEUE_ADD adds a valid movie", () => {
    const s = setup("bob", ["a", "b", "c"]);
    const a = hostQueueAdd("d");
    const x = setup("bob", ["a", "b", "c", "d"]);
    expect(rootReducer(s, a)).to.deep.equal(x);
  });
  it("HOST_QUEUE_ADD ignores a duplicate movie", () => {
    const s = setup("bob", ["a", "b", "c"]);
    const a = hostQueueAdd("c");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });
  it("HOST_QUEUE_ADD ignores a missing movie", () => {
    const s = setup("bob", ["a", "b", "c"]);
    const a = hostQueueAdd(undefined);
    expect(rootReducer(s, a)).to.deep.equal(s);
  });
  it("HOST_QUEUE_ADD ignores a null movie", () => {
    const s = setup("bob", ["a", "b", "c"]);
    const a = hostQueueAdd(null);
    expect(rootReducer(s, a)).to.deep.equal(s);
  });
  it("HOST_QUEUE_ADD ignores an empty movie", () => {
    const s = setup("bob", ["a", "b", "c"]);
    const a = hostQueueAdd("");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("HOST_QUEUE_DELETE removes a valid movie", () => {
    const s = setup("bob", ["a", "b", "c"]);
    const a = hostQueueDelete("b");
    const x = setup("bob", ["a", "c"]);
    expect(rootReducer(s, a)).to.deep.equal(x);
  });
  it("HOST_QUEUE_DELETE ignores a new movie", () => {
    const s = setup("bob", ["a", "b", "c"]);
    const a = hostQueueDelete("d");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });
  it("HOST_QUEUE_DELETE ignores a missing movie", () => {
    const s = setup("bob", ["a", "b", "c"]);
    const a = hostQueueDelete(undefined);
    expect(rootReducer(s, a)).to.deep.equal(s);
  });
  it("HOST_QUEUE_DELETE ignores a null movie", () => {
    const s = setup("bob", ["a", "b", "c"]);
    const a = hostQueueDelete(null);
    expect(rootReducer(s, a)).to.deep.equal(s);
  });
  it("HOST_QUEUE_DELETE ignores an empty movie", () => {
    const s = setup("bob", ["a", "b", "c"]);
    const a = hostQueueDelete("");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

});