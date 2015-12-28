import { expect } from "chai";

import frozenRootReducer from "../frozenRootReducer";
import { IRootData } from "../../src/rootData";
import { next } from "../../src/actionCreators";
import { signin } from "../../src/stateCreators";

describe("top-level reducer", () => {

  it("provides a default state", () => {
    const nextState: IRootData = frozenRootReducer(undefined, next());
    const expectedState: IRootData = signin();
    expect(nextState).to.deep.equal(expectedState);
  });

  it("makes no change with unknown mode", () => {
    const startState: IRootData = {
      mode: "UNKNOWN_STATE"
    };
    const nextState: IRootData = frozenRootReducer(startState, next());
    expect(nextState).to.deep.equal(startState);
  });

});
