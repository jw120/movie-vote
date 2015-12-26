/* eslint-env mocha */
/* @flow */

import React from "react";
import { expect } from "chai";
import { createRenderer } from "react-addons-test-utils";

import Signin from "../../src/components/Signin";

const shallowRenderer = createRenderer();

describe("Signin component without host", () => {

  shallowRenderer.render(
    <Signin />
  );
  const v = shallowRenderer.getRenderOutput();

  it("renders a top level .signin form with four children", () => {
    expect(v.type).to.equal("form");
    expect(v.props.className).to.equal("signin");
    expect(v.props.children.length).to.equal(4);
  });

  it("renders a second-level .signin-heading h3", () => {
    let v0 = v.props.children[0];
    expect(v0.type).to.equal("h3");
    expect(v0.props.className).to.equal("signin-heading");
    expect(v0.props.children).to.equal("Welcome to Movie Vote");
  });

  it("renders a second-level .signin-input Input", () => {
    let v1 = v.props.children[1];
    expect(v1.type.name).to.equal("Input");
    expect(v1.props.className).to.equal("signin-input");
    expect(v1.props.type).to.equal("text");
    expect(v1.props.placeholder).to.equal("Enter your name");
    expect(v1.props.children).to.be.undefined;
  });

  it("renders a second-level disabled join Button ", () => {
    let v2 = v.props.children[2];
    expect(v2.type.displayName).to.equal("Button");
    expect(v2.props.bsSize).to.equal("large");
    expect(v2.props.bsStyle).to.equal("default");
    expect(v2.props.disabled).to.be.true;
    expect(v2.props.block).to.be.true;
    expect(v2.props.children).to.equal("No vote available to join");
  });

  it("renders a second-level host Button ", () => {
    let v3 = v.props.children[3];
    expect(v3.type.displayName).to.equal("Button");
    expect(v3.props.bsSize).to.equal("large");
    expect(v3.props.bsStyle).to.equal("primary");
    expect(v3.props.disabled).to.be.false;
    expect(v3.props.block).to.be.true;
    expect(v3.props.children).to.equal("Host a new vote");
  });

});

describe("Signin component with host", () => {

  shallowRenderer.render(
    <Signin
      hostName="henry"
      movieA="Frozen"
      movieB="12 angry men"
    />
  );
  const v = shallowRenderer.getRenderOutput();

  it("renders a top level .signin form with four children", () => {
    expect(v.type).to.equal("form");
    expect(v.props.className).to.equal("signin");
    expect(v.props.children.length).to.equal(4);
  });

  it("renders a second-level .signin-heading h3", () => {
    let v0 = v.props.children[0];
    expect(v0.type).to.equal("h3");
    expect(v0.props.className).to.equal("signin-heading");
    expect(v0.props.children).to.equal("Welcome to Movie Vote");
  });

  it("renders a second-level .signin-input Input", () => {
    let v1 = v.props.children[1];
    expect(v1.type.name).to.equal("Input");
    expect(v1.props.className).to.equal("signin-input");
    expect(v1.props.type).to.equal("text");
    expect(v1.props.placeholder).to.equal("Enter your name");
    expect(v1.props.children).to.be.undefined;
  });

  it("renders a second-level join Button ", () => {
    let v2 = v.props.children[2];
    expect(v2.type.displayName).to.equal("Button");
    expect(v2.props.bsSize).to.equal("large");
    expect(v2.props.bsStyle).to.equal("primary");
    expect(v2.props.disabled).to.be.false;
    expect(v2.props.block).to.be.true;
    expect(v2.props.children.join("")).to.equal("Join henry's vote");
  });

  it("renders a second-level host Button ", () => {
    let v3 = v.props.children[3];
    expect(v3.type.displayName).to.equal("Button");
    expect(v3.props.bsSize).to.equal("large");
    expect(v3.props.bsStyle).to.equal("primary");
    expect(v3.props.disabled).to.be.false;
    expect(v3.props.block).to.be.true;
    expect(v3.props.children).to.equal("Host a new vote");
  });

});
