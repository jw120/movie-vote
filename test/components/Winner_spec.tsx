import * as React from "react";
import { expect } from "chai";
import { createRenderer } from "react-addons-test-utils";
import { ShallowRenderer } from "../../src/myTypings/shallowRenderer";
import dummyCallback from "../dummyCallback";

import Winner from "../../src/components/Winner";

const shallowRenderer: ShallowRenderer = createRenderer();

describe("Winner component without host", () => {

  shallowRenderer.render(
    <Winner
      winner="Platoon"
      onJoin={ dummyCallback }
      onStartSetup={ dummyCallback }
    />
  );
  const v: any = shallowRenderer.getRenderOutput();

  it("renders a top level .winner div with three children", () => {
    expect(v.type).to.equal("div");
    expect(v.props.className).to.equal("winner");
    expect(v.props.children.length).to.equal(3);
  });

  it("renders a second-level .winner-announce div", () => {
    let v0: any = v.props.children[0];
    expect(v0.type).to.equal("div");
    expect(v0.props.className).to.equal("winner-announce");
    expect(v0.props.children.join("")).to.equal("The winner is Platoon");
  });

  it("renders a second-level disabled join Button ", () => {
    let v1: any = v.props.children[1];
    expect(v1.type.displayName).to.equal("Button");
    expect(v1.props.bsSize).to.equal("large");
    expect(v1.props.bsStyle).to.equal("default");
    expect(v1.props.disabled).to.be.true;
    expect(v1.props.block).to.be.true;
    expect(v1.props.children).to.equal("No vote available to join");
  });

  it("renders a second-level host Button ", () => {
    let v2: any = v.props.children[2];
    expect(v2.type.displayName).to.equal("Button");
    expect(v2.props.bsSize).to.equal("large");
    expect(v2.props.bsStyle).to.equal("primary");
    expect(v2.props.disabled).to.be.false;
    expect(v2.props.block).to.be.true;
    expect(v2.props.children).to.equal("Host a new vote");
  });

});

describe("Winner component with host", () => {

  shallowRenderer.render(
    <Winner
      hostName="henry"
      winner="Platoon"
      movieA="Frozen"
      movieB="Angry men"
      onJoin={ dummyCallback }
      onStartSetup={ dummyCallback }
    />
  );
  const v: any = shallowRenderer.getRenderOutput();

  it("renders a top level .winner div with three children", () => {
    expect(v.type).to.equal("div");
    expect(v.props.className).to.equal("winner");
    expect(v.props.children.length).to.equal(3);
  });

  it("renders a second-level .winner-announce div", () => {
    let v0: any = v.props.children[0];
    expect(v0.type).to.equal("div");
    expect(v0.props.className).to.equal("winner-announce");
    expect(v0.props.children.join("")).to.equal("The winner is Platoon");
  });

  it("renders a second-level join Button ", () => {
    let v1: any = v.props.children[1];
    expect(v1.type.displayName).to.equal("Button");
    expect(v1.props.bsSize).to.equal("large");
    expect(v1.props.bsStyle).to.equal("primary");
    expect(v1.props.disabled).to.be.false;
    expect(v1.props.block).to.be.true;
  });

  it("renders a second-level host Button ", () => {
    let v2: any = v.props.children[2];
    expect(v2.type.displayName).to.equal("Button");
    expect(v2.props.bsSize).to.equal("large");
    expect(v2.props.bsStyle).to.equal("primary");
    expect(v2.props.disabled).to.be.false;
    expect(v2.props.block).to.be.true;
    expect(v2.props.children).to.equal("Host a new vote");
  });

});
