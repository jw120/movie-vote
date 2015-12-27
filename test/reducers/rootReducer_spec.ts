import { expect } from "chai";

import frozenRootReducer from "../frozenRootReducer";
import { RootData } from "../../src/rootData";
import { next } from "../../src/actionCreators";
import { signin } from "../../src/stateCreators";

describe("top-level reducer", () => {

  it("provides a default state", () => {
    const nextState = frozenRootReducer(undefined, next());
    const expectedState = signin();
    expect(nextState).to.deep.equal(expectedState);
  });

  it("makes no change with unknown mode", () => {
    const startState: RootData = {
      mode: "UNKNOWN_STATE"
    };
    const nextState = frozenRootReducer(startState, next());
    expect(nextState).to.deep.equal(startState);
  });

});
