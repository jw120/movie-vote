/* eslint-env mocha */
/* @flow */

import { expect } from "chai";

import actionCreators from "../../src/actionCreators";
import rootReducer from "../../src/reducers/rootReducer";

import { mkSignin } from "../../src/reducers/signin";
import { mkVoting } from "../../src/reducers/voting";
import { mkSetup } from "../../src/reducers/setup";

describe("signin reducer", () => {

  it("JOIN triggers a move to voting mode with valid names", () => {
    const s = mkSignin("host", "m1", "m2");
    const a = actionCreators.join("me");
    const x = mkVoting("me", "host", "m1", "m2", null);
    expect(rootReducer(s, a)).to.deep.equal(x);
  });

  it("JOIN does nothing without a host", () => {
    const s = mkSignin();
    const a = actionCreators.join("me");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("JOIN does nothing with null movieA", () => {
    const s = mkSignin("host", null);
    const a = actionCreators.join("me");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("JOIN does nothing with empty movieB", () => {
    const s = mkSignin("host", "m1", "");
    const a = actionCreators.join("me");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("START_SETUP triggers a move to setup mode with valid name", () => {
    const s = mkSignin();
    const a = actionCreators.startSetup("me");
    const x = mkSetup("me", []);
    expect(rootReducer(s, a)).to.deep.equal(x);
  });

  it("START_SETUP does nothing with missing name", () => {
    const s = mkSignin();
    const a = actionCreators.startSetup();
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("START_SETUP does nothing with null name", () => {
    const s = mkSignin();
    const a = actionCreators.startSetup(null);
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("START_SETUP does nothing with empty name", () => {
    const s = mkSignin();
    const a = actionCreators.startSetup("");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("REMOTE_HOST_READY updates the state with valid arguments", () => {
    const s = mkSignin();
    const a = actionCreators.remoteHostReady("host", "m1", "m2");
    const x = mkSignin("host", "m1", "m2");
    expect(rootReducer(s, a)).to.deep.equal(x);
  });

  it("REMOTE_HOST_READY does nothing with missing arguments", () => {
    const s = mkSignin();
    const a = actionCreators.remoteHostReady();
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("REMOTE_HOST_READY does nothing with null arguments", () => {
    const s = mkSignin();
    const a = actionCreators.remoteHostReady("h", null, "b2");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("REMOTE_HOST_READY does nothing with empty arguments", () => {
    const s = mkSignin();
    const a = actionCreators.remoteHostReady("h", "a", "");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });


});
