import * as expect from "expect";

import { join, startSetup, remoteHostReady, IAction } from "../../src/actionCreators";
import { signin, voting, setup } from "../../src/stateCreators";
import frozenRootReducer from "../frozenRootReducer";
import { IRootData } from "../../src/rootData";

describe("signin reducer", () => {

  it("JOIN triggers a move to voting mode with valid names", () => {
    const s: IRootData = signin({ }, "host", "m1", "m2");
    const a: IAction = join("me");
    const x: IRootData = voting({ }, "me", "host", "m1", "m2", null);
    expect(frozenRootReducer(s, a)).toEqual(x);
  });

  it("JOIN does nothing without a host", () => {
    const s: IRootData = signin({ });
    const a: IAction = join("me");
    expect(frozenRootReducer(s, a)).toEqual(s);
  });

  it("JOIN does nothing with null movieA", () => {
    const s: IRootData = signin({ }, "host", null);
    const a: IAction = join("me");
    expect(frozenRootReducer(s, a)).toEqual(s);
  });

  it("JOIN does nothing with empty movieB", () => {
    const s: IRootData = signin({ }, "host", "m1", "");
    const a: IAction = join("me");
    expect(frozenRootReducer(s, a)).toEqual(s);
  });

  it("START_SETUP triggers a move to setup mode with valid name", () => {
    const s: IRootData = signin({ });
    const a: IAction = startSetup("me");
    const x: IRootData = setup(s, "me", []);
    expect(frozenRootReducer(s, a)).toEqual(x);
  });

  it("START_SETUP does nothing with missing name", () => {
    const s: IRootData = signin({ });
    const a: IAction = startSetup();
    expect(frozenRootReducer(s, a)).toEqual(s);
  });

  it("START_SETUP does nothing with null name", () => {
    const s: IRootData = signin({ });
    const a: IAction = startSetup(null);
    expect(frozenRootReducer(s, a)).toEqual(s);
  });

  it("START_SETUP does nothing with empty name", () => {
    const s: IRootData = signin({ });
    const a: IAction = startSetup("");
    expect(frozenRootReducer(s, a)).toEqual(s);
  });

  it("REMOTE_HOST_READY updates the state with valid arguments", () => {
    const s: IRootData = signin({ });
    const a: IAction = remoteHostReady("host", "m1", "m2");
    const x: IRootData = signin({ }, "host", "m1", "m2");
    expect(frozenRootReducer(s, a)).toEqual(x);
  });

  it("REMOTE_HOST_READY does nothing with missing arguments", () => {
    const s: IRootData = signin({ });
    const a: IAction = remoteHostReady(undefined, undefined, undefined);
    expect(frozenRootReducer(s, a)).toEqual(s);
  });

  it("REMOTE_HOST_READY does nothing with null arguments", () => {
    const s: IRootData = signin({ });
    const a: IAction = remoteHostReady("h", null, "b2");
    expect(frozenRootReducer(s, a)).toEqual(s);
  });

  it("REMOTE_HOST_READY does nothing with empty arguments", () => {
    const s: IRootData = signin({ });
    const a: IAction = remoteHostReady("h", "a", "");
    expect(frozenRootReducer(s, a)).toEqual(s);
  });

});
