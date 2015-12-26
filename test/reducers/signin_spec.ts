import { expect } from "chai";

import { join, startSetup, remoteHostReady } from "../../src/actionCreators";
import { signin, voting, setup } from "../../src/stateCreators";
import rootReducer from "../../src/reducers/rootReducer";

import mock from "../mocks";
import { initSocketClient } from "../../src/socket";
initSocketClient(mock.store, mock.io);

describe("signin reducer", () => {

  it("JOIN triggers a move to voting mode with valid names", () => {
    const s = signin("host", "m1", "m2");
    const a = join("me");
    const x = voting("me", "host", "m1", "m2", null);
    expect(rootReducer(s, a)).to.deep.equal(x);
  });

  it("JOIN does nothing without a host", () => {
    const s = signin();
    const a = join("me");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("JOIN does nothing with null movieA", () => {
    const s = signin("host", null);
    const a = join("me");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("JOIN does nothing with empty movieB", () => {
    const s = signin("host", "m1", "");
    const a = join("me");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("START_SETUP triggers a move to setup mode with valid name", () => {
    const s = signin();
    const a = startSetup("me");
    const x = setup("me", []);
    expect(rootReducer(s, a)).to.deep.equal(x);
  });

  it("START_SETUP does nothing with missing name", () => {
    const s = signin();
    const a = startSetup();
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("START_SETUP does nothing with null name", () => {
    const s = signin();
    const a = startSetup(null);
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("START_SETUP does nothing with empty name", () => {
    const s = signin();
    const a = startSetup("");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("REMOTE_HOST_READY updates the state with valid arguments", () => {
    const s = signin();
    const a = remoteHostReady("host", "m1", "m2");
    const x = signin("host", "m1", "m2");
    expect(rootReducer(s, a)).to.deep.equal(x);
  });

  it("REMOTE_HOST_READY does nothing with missing arguments", () => {
    const s = signin();
    const a = remoteHostReady(undefined, undefined, undefined);
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("REMOTE_HOST_READY does nothing with null arguments", () => {
    const s = signin();
    const a = remoteHostReady("h", null, "b2");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

  it("REMOTE_HOST_READY does nothing with empty arguments", () => {
    const s = signin();
    const a = remoteHostReady("h", "a", "");
    expect(rootReducer(s, a)).to.deep.equal(s);
  });

});
