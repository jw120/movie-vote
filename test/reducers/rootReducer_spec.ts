import { expect } from "chai";

import rootReducer from "../../src/reducers/rootReducer";
import { RootData } from "../../src/rootData";
import { next } from "../../src/actionCreators";
import { signin } from "../../src/stateCreators";

describe("top-level reducer", () => {

  it("provides a default state", () => {
    const nextState = rootReducer(undefined, next());
    const expectedState = signin();
    expect(nextState).to.deep.equal(expectedState);
  });

  it("makes no change with unknown mode", () => {
    const startState: RootData = {
      mode: "UNKNOWN_STATE"
    };
    const nextState = rootReducer(startState, next());
    expect(nextState).to.deep.equal(startState);
  });

});
