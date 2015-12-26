import { expect } from "chai";

import rootReducer from "../../src/reducers/rootReducer";
import { next } from "../../src/actionCreators";
import { signin } from "../../src/stateCreators";

describe("top-level reducer", () => {

  it("provides a default state", () => {
    const nextState = rootReducer(undefined, next());
    const expectedState = signin();
    expect(nextState).to.deep.equal(expectedState);
  });


});
