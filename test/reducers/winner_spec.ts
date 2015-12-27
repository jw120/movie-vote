import { expect } from "chai";

import { join, remoteHostReady, startSetup, remoteWinner } from "../../src/actionCreators";
import { winner, voting, setup } from "../../src/stateCreators";
import frozenRootReducer from "../frozenRootReducer";

describe("winner reducer", () => {

  it("JOIN triggers a move to voting mode with valid host and movie names", () => {
    const s = winner("bob", "henry", "ww", "m1", "m2");
    const a = join();
    const x = voting("bob", "henry", "m1", "m2", null);
    expect(frozenRootReducer(s, a)).to.deep.equal(x);
  });
  it("JOIN does nothing without a valid host", () => {
    const s = winner("bob", null, "ww", "m1", "m2");
    const a = join();
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });
  it("JOIN does nothing with a null movie", () => {
    const s = winner("bob", "henry", "ww", null, "m2");
    const a = join();
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });
  it("JOIN does nothing with an empty movie", () => {
    const s = winner("bob", "henry", "ww", "m1", "");
    const a = join();
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });
  it("JOIN does nothing with a missing movie", () => {
    const s = winner("bob", "henry", "ww", undefined, "m2");
    const a = join();
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });

  it("START_SETUP triggers a move to setup mode", () => {
    const s = winner("bob", "henry", "ww", "m1", "m2");
    const a = startSetup();
    const x = setup("bob", []);
    expect(frozenRootReducer(s, a)).to.deep.equal(x);
  });

  it("REMOTE_HOST_READY updates the state with valid arguments", () => {
    const s = winner("bob", "henry", "ww", "m1", "m2");
    const a = remoteHostReady("host", "new1", "new2");
    const x = winner("bob", "host", "ww", "new1", "new2");
    expect(frozenRootReducer(s, a)).to.deep.equal(x);
  });
  it("REMOTE_HOST_READY does nothing with null arguments", () => {
    const s = winner("bob", "henry", "ww", "m1", "m2");
    const a = remoteHostReady(null, "new1", "new2");
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });
  it("REMOTE_HOST_READY does nothing with missing arguments", () => {
    const s = winner("bob", "henry", "ww", "m1", "m2");
    const a = remoteHostReady("host", "new1", undefined);
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });
  it("REMOTE_HOST_READY does nothing with empty arguments", () => {
    const s = winner("bob", "henry", "ww", "m1", "m2");
    const a = remoteHostReady("host", "", "new2");
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });

  it("REMOTE_WINNER passed through", () => {
    const s = winner("bob", "henry", "ww", "m1", "m2");
    const a = remoteWinner("m");
    expect(frozenRootReducer(s, a)).to.deep.equal(s);
  });

});
