/* eslint-env mocha */
/* @flow */

import { expect } from "chai";

import rootReducer from "../../src/reducers/rootReducer";
import actionCreators from "../../src/actionCreators";
import { mkSignin } from "../../src/reducers/signin";

describe("top-level reducer", () => {

  it("provides a default state", () => {
    const nextState = rootReducer(undefined, actionCreators.next());
    const expectedState = mkSignin(null);
    expect(nextState).to.deep.equal(expectedState);
  });


});
