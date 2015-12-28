import { expect } from "chai";

import { join, remoteHostReady, startSetup, remoteWinner, IAction } from "../../src/actionCreators";
import { winner, voting, setup } from "../../src/stateCreators";
import frozenRootReducer from "../frozenRootReducer";
import { IRootData } from "../../src/rootData";

describe("winner reducer", () => {

  it("JOIN triggers a move to voting mode with valid host and movie names", () => {
    const s: IRootData = winner({ }, "bob", "henry", "ww", "m1", "m2");
    const a: IAction = join();
    const x: IRootData = voting(s, "bob", "henry", "m1", "m2", null);
    expect(frozenRootReducer(s, a)).to.deep.equal(x);
  });
  it("JOIN does nothing without a valid host", () => {
    const s: IRootData = winner({ }, "bob", null, "ww", "m1", "m2");
    const a: IAction = join();
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });
  it("JOIN does nothing with a null movie", () => {
    const s: IRootData = winner({ }, "bob", "henry", "ww", null, "m2");
    const a: IAction = join();
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });
  it("JOIN does nothing with an empty movie", () => {
    const s: IRootData = winner({ }, "bob", "henry", "ww", "m1", "");
    const a: IAction = join();
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });
  it("JOIN does nothing with a missing movie", () => {
    const s: IRootData = winner({ }, "bob", "henry", "ww", undefined, "m2");
    const a: IAction = join();
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });

  it("START_SETUP triggers a move to setup mode", () => {
    const s: IRootData = winner({ }, "bob", "henry", "ww", "m1", "m2");
    const a: IAction = startSetup();
    const x: IRootData = setup(s, "bob", []);
    expect(frozenRootReducer(s, a)).to.deep.equal(x);
  });

  it("REMOTE_HOST_READY updates the state with valid arguments", () => {
    const s: IRootData = winner({ }, "bob", "henry", "ww", "m1", "m2");
    const a: IAction = remoteHostReady("host", "new1", "new2");
    const x: IRootData = winner({ }, "bob", "host", "ww", "new1", "new2");
    expect(frozenRootReducer(s, a)).to.deep.equal(x);
  });
  it("REMOTE_HOST_READY does nothing with null arguments", () => {
    const s: IRootData = winner({ }, "bob", "henry", "ww", "m1", "m2");
    const a: IAction = remoteHostReady(null, "new1", "new2");
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });
  it("REMOTE_HOST_READY does nothing with missing arguments", () => {
    const s: IRootData = winner({ }, "bob", "henry", "ww", "m1", "m2");
    const a: IAction = remoteHostReady("host", "new1", undefined);
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });
  it("REMOTE_HOST_READY does nothing with empty arguments", () => {
    const s: IRootData = winner({ }, "bob", "henry", "ww", "m1", "m2");
    const a: IAction = remoteHostReady("host", "", "new2");
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });

  it("REMOTE_WINNER passed through", () => {
    const s: IRootData = winner({ }, "bob", "henry", "ww", "m1", "m2");
    const a: IAction = remoteWinner("m");
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });

});
