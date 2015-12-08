/* eslint-env mocha */

import * as sd from "skin-deep";
import * as React from "react";
import { expect } from "chai";

import Winner from "../../src/components/Winner";

// Set up to use shadowRendering for each test
var vdom, instance, tree;
beforeEach(function () {
  tree = sd.shallowRender(
    <Winner
      hostName="henry"
      winner="Platoon"
    />
  );
  instance = tree.getMountedInstance();
  vdom = tree.getRenderOutput();
});

describe("Winner component", () => {

  it("should render with a correct class name", () => {
    expect(vdom.props.className).to.eql("winner");
  });

  it("should show the winner in .winner-announce", function () {
    expect(tree.textIn(".winner-announce")).to.eql("The winner is Platoon");
  });

});
