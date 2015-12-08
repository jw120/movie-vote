/* eslint-env mocha */

import * as sd from "skin-deep";
import * as React from "react";
import { expect } from "chai";

import Winner from "../../src/components/Winner";

describe("Winner component without host", () => {

  const tree = sd.shallowRender(
    <Winner
      name="bob"
      winner="Platoon"
    />
  );
  const vdom = tree.getRenderOutput();

  it("renders a top level div with class winner", () => {
    expect(vdom.type).to.equal("div");
    expect(vdom.props.className).to.equal("winner");
  });

  it("renders a second-level winner-announce div", () => {
    let v = vdom.props.children[0];
    expect(v.type).to.equal("div");
    expect(v.props.className).to.equal("winner-announce");
    expect(v.props.children.join("")).to.equal("The winner is Platoon");
  });

  it("renders a second-level disabled join Button ", () => {
    let v = vdom.props.children[1];
    expect(v.type.displayName).to.equal("Button");
    expect(v.props.bsSize).to.equal("large");
    expect(v.props.bsStyle).to.equal("default");
    expect(v.props.disabled).to.be.true;
    expect(v.props.block).to.be.true;
    expect(v.props.children).to.equal("No vote available to join");
  });

  it("renders a second-level host Button ", () => {
    let v = vdom.props.children[2];
    expect(v.type.displayName).to.equal("Button");
    expect(v.props.bsSize).to.equal("large");
    expect(v.props.bsStyle).to.equal("primary");
    expect(v.props.disabled).to.be.false;
    expect(v.props.block).to.be.true;
    expect(v.props.children).to.equal("Host a new vote");
  });

});

describe("Winner component with host", () => {

  const tree = sd.shallowRender(
    <Winner
      name="bob"
      hostName="henry"
      winner="Platoon"
      movieA="Frozen"
      movieB="Angry men"
    />
  );
  const vdom = tree.getRenderOutput();

  it("renders a top level div with class winner", () => {
    expect(vdom.type).to.equal("div");
    expect(vdom.props.className).to.equal("winner");
  });

  it("renders a second-level winner-announce div", () => {
    let v = vdom.props.children[0];
    expect(v.type).to.equal("div");
    expect(v.props.className).to.equal("winner-announce");
    expect(v.props.children.join("")).to.equal("The winner is Platoon");
  });

  it("renders a second-level enabled join Button ", () => {
    let v = vdom.props.children[1];
    expect(v.type.displayName).to.equal("Button");
    expect(v.props.bsSize).to.equal("large");
    expect(v.props.bsStyle).to.equal("primary");
    expect(v.props.disabled).to.be.false;
    expect(v.props.block).to.be.true;
    expect(v.props.children.join("")).to.equal("Join henry's vote");
  });

  it("renders a second-level host Button ", () => {
    let v = vdom.props.children[2];
    expect(v.type.displayName).to.equal("Button");
    expect(v.props.bsSize).to.equal("large");
    expect(v.props.bsStyle).to.equal("primary");
    expect(v.props.disabled).to.be.false;
    expect(v.props.block).to.be.true;
    expect(v.props.children).to.equal("Host a new vote");
  });

});
