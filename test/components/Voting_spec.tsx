import * as React from "react";
import { expect } from "chai";
import { createRenderer } from "react-addons-test-utils";
import { ShallowRenderer } from "../../src/myTypings/shallowRenderer";
import dummyCallback from "../dummyCallback";

import Voting from "../../src/components/Voting";

const shallowRenderer: ShallowRenderer = createRenderer();

describe("Voting component (no vote)", () => {

  shallowRenderer.render(
    <Voting
      name="Bob"
      hostName="Henry"
      movieA="Frozen"
      movieB="Doom"
      onVote={ dummyCallback }
    />
  );
  const v: any = shallowRenderer.getRenderOutput();

  it("renders a top level .voting div with three children", () => {
    expect(v.type).to.equal("div");
    expect(v.props.className).to.equal("voting");
    expect(v.props.children.length).to.equal(3);
  });

  it("renders a second-level .voting-label div with text", () => {
    const v0: any = v.props.children[0];
    expect(v0.type).to.equal("div");
    expect(v0.props.className).to.equal("voting-label");
    expect(v0.props.children.join("")).to.equal("Henry's vote (Bob)");
  });

  it("renders a second-level movieA Button ", () => {
    let v1: any = v.props.children[1];
    expect(v1.type.displayName).to.equal("Button");
    expect(v1.props.bsSize).to.equal("large");
    expect(v1.props.bsStyle).to.equal("primary");
    expect(v1.props.disabled).to.be.false;
    expect(v1.props.block).to.be.true;
    expect(v1.props.children).to.equal("Frozen");
  });

  it("renders a second-level movieB Button ", () => {
    let v2: any = v.props.children[2];
    expect(v2.type.displayName).to.equal("Button");
    expect(v2.props.bsSize).to.equal("large");
    expect(v2.props.bsStyle).to.equal("primary");
    expect(v2.props.disabled).to.be.false;
    expect(v2.props.block).to.be.true;
    expect(v2.props.children).to.equal("Doom");
  });

});

describe("Voting component (vote for A)", () => {

  shallowRenderer.render(
    <Voting
      name="Bob"
      hostName="Henry"
      movieA="Frozen"
      movieB="Doom"
      voted="Frozen"
      onVote={ dummyCallback }
    />
  );
  const v: any = shallowRenderer.getRenderOutput();

  it("renders a top level .voting div with three children", () => {
    expect(v.type).to.equal("div");
    expect(v.props.className).to.equal("voting");
    expect(v.props.children.length).to.equal(3);
  });

  it("renders a second-level .voting-label div with text", () => {
    const v0: any = v.props.children[0];
    expect(v0.type).to.equal("div");
    expect(v0.props.className).to.equal("voting-label");
    expect(v0.props.children.join("")).to.equal("Henry's vote (Bob)");
  });

  it("renders a second-level movieA Button ", () => {
    let v1: any = v.props.children[1];
    expect(v1.type.displayName).to.equal("Button");
    expect(v1.props.bsSize).to.equal("large");
    expect(v1.props.bsStyle).to.equal("primary");
    expect(v1.props.disabled).to.be.true;
    expect(v1.props.block).to.be.true;
    expect(v1.props.children).to.equal("Frozen");
  });

  it("renders a second-level movieB Button ", () => {
    let v2: any = v.props.children[2];
    expect(v2.type.displayName).to.equal("Button");
    expect(v2.props.bsSize).to.equal("large");
    expect(v2.props.bsStyle).to.equal("default");
    expect(v2.props.disabled).to.be.true;
    expect(v2.props.block).to.be.true;
    expect(v2.props.children).to.equal("Doom");
  });

});

describe("Voting component (voted for B)", () => {

  shallowRenderer.render(
    <Voting
      name="Bob"
      hostName="Henry"
      movieA="Frozen"
      movieB="Doom"
      voted="Doom"
      onVote={ dummyCallback }
    />
  );
  const v: any = shallowRenderer.getRenderOutput();

  it("renders a top level .voting div with three children", () => {
    expect(v.type).to.equal("div");
    expect(v.props.className).to.equal("voting");
    expect(v.props.children.length).to.equal(3);
  });

  it("renders a second-level .voting-label div with text", () => {
    const v0: any = v.props.children[0];
    expect(v0.type).to.equal("div");
    expect(v0.props.className).to.equal("voting-label");
    expect(v0.props.children.join("")).to.equal("Henry's vote (Bob)");
  });

  it("renders a second-level movieA Button ", () => {
    let v1: any = v.props.children[1];
    expect(v1.type.displayName).to.equal("Button");
    expect(v1.props.bsSize).to.equal("large");
    expect(v1.props.bsStyle).to.equal("default");
    expect(v1.props.disabled).to.be.true;
    expect(v1.props.block).to.be.true;
    expect(v1.props.children).to.equal("Frozen");
  });

  it("renders a second-level movieB Button ", () => {
    let v2: any = v.props.children[2];
    expect(v2.type.displayName).to.equal("Button");
    expect(v2.props.bsSize).to.equal("large");
    expect(v2.props.bsStyle).to.equal("primary");
    expect(v2.props.disabled).to.be.true;
    expect(v2.props.block).to.be.true;
    expect(v2.props.children).to.equal("Doom");
  });

});
