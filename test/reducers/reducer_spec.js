/* eslint-env mocha */
/* @flow */

import { expect } from "chai";

import reducer from "../../src/reducers/reducer";
import actionCreators from "../../src/actionCreators";
import { mkSignin } from "../../src/reducers/signin";

describe("top-level reducer", () => {

  it("provides a default state", () => {
    const nextState = reducer(undefined, actionCreators.next());
    const expectedState = mkSignin(null);
    expect(nextState).to.deep.equal(expectedState);
  });


});
