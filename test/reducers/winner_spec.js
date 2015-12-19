/* eslint-env mocha */
/* @flow */

import { expect } from "chai";

import actionCreators from "../../src/actionCreators";
import rootReducer from "../../src/reducers/rootReducer";

import { mkWinner } from "../../src/reducers/winner";
import { mkVoting } from "../../src/reducers/voting";
import { mkSetup } from "../../src/reducers/setup";

describe("winner reducer", () => {

  it("JOIN triggers a move to voting mode with valid host and movie names", () => {
    const s = mkWinner("bob", "henry", "ww", "m1", "m2");
    const a = actionCreators.join();
    const x = mkVoting("bob", "henry", "m1", "m2", null);
    expect(rootReducer(s, a)).to.deep.equal(x);
  });
  it("JOIN does nothing without a valid host", () => {
    const s = mkWinner("bob", null, "ww", "m1", "m2");
    const a = actionCreators.join();
    expect(rootReducer(s, a)).to.deep.equal(s);
  });
  it("JOIN does nothing with a null movie", () => {
    const s = mkWinner("bob", "henry", "ww", null, "m2");
    const a = actionCreators.join();
    expect(rootReducer(s, a)).to.deep.equal(s);
  });
  it("JOIN does nothing with an empty movie", () => {
    const s = mkWinner("bob", "henry", "ww", "m1", "");
    const a = actionCreators.join();
    expect(rootReducer(s, a)).to.deep.equal(s);
  });
  it("JOIN does nothing with a missing movie", () => {
    const s = mkWinner("bob", "henry", "ww", undefined, "m2");
    const a = actionCreators.join();
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("START_SETUP triggers a move to setup mode", () => {
    const s = mkWinner("bob", "henry", "ww", "m1", "m2");
    const a = actionCreators.startSetup();
    const x = mkSetup("bob", []);
    expect(rootReducer(s, a)).to.deep.equal(x);
  });

  it("REMOTE_HOST_READY updates the state with valid arguments", () => {
    const s = mkWinner("bob", "henry", "ww", "m1", "m2");
    const a = actionCreators.remoteHostReady("host", "new1", "new2");
    const x = mkWinner("bob", "host", "ww", "new1", "new2");
    expect(rootReducer(s, a)).to.deep.equal(x);
  });
  it("REMOTE_HOST_READY does nothing with null arguments", () => {
    const s = mkWinner("bob", "henry", "ww", "m1", "m2");
    const a = actionCreators.remoteHostReady(null, "new1", "new2");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });
  it("REMOTE_HOST_READY does nothing with missing arguments", () => {
    const s = mkWinner("bob", "henry", "ww", "m1", "m2");
    const a = actionCreators.remoteHostReady("host", "new1");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });
  it("REMOTE_HOST_READY does nothing with empty arguments", () => {
    const s = mkWinner("bob", "henry", "ww", "m1", "m2");
    const a = actionCreators.remoteHostReady("host", "", "new2");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

});
