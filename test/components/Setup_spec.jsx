/* eslint-env mocha */

import * as React from "react";
import { expect } from "chai";
import { createRenderer } from "react-addons-test-utils";

import Setup from "../../src/components/Setup";

const shallowRenderer = createRenderer();

describe("Setup component", () => {

  shallowRenderer.render(
    <Setup
      name="Bob"
      queue={ [ "Ascension", "Doom"] }
    />
  );
  const v = shallowRenderer.getRenderOutput();

  it("renders a top level .setup div with three children", () => {
    expect(v.type).to.equal("div");
    expect(v.props.className).to.equal("setup");
    expect(v.props.children.length).to.equal(3);
  });

  const v0 = v.props.children[0];
  it("renders a second-level .setup-form form with two children", () => {
    expect(v0.type).to.equal("form");
    expect(v0.props.className).to.equal("setup-form");
    expect(v0.props.children.length).to.equal(2);
  });

  it("... with a .setup-heading h3", () => {
    expect(v0.props.children[0].type).to.equal("h3");
    expect(v0.props.children[0].props.className).to.equal("setup-heading");
    expect(v0.props.children[0].props.children).to.equal("Set up the vote");
  });

  it("... with a .setup-input Input", () => {
    expect(v0.props.children[1].type.name).to.equal("Input");
    expect(v0.props.children[1].props.className).to.equal("setup-input");
    expect(v0.props.children[1].props.type).to.equal("text");
    expect(v0.props.children[1].props.placeholder).to.equal("Add movie");
    expect(v0.props.children[1].props.children).to.be.undefined;
  });

  const v1 = v.props.children[1];
  it("renders a second-level .setup-table Table ", () => {
    expect(v1.type.displayName).to.equal("Table");
    expect(v1.props.className).to.equal("setup-table");
  });

  it("... with thead and tbody children ", () => {
    expect(v1.props.children.length).to.equal(2);
    expect(v1.props.children[0].type).to.equal("thead");
    expect(v1.props.children[1].type).to.equal("tbody");
  });

  it("... with thead containing the header row ", () => {
    const tr = v1.props.children[0].props.children;
    expect(tr.type).to.equal("tr");
    expect(tr.props.children.length).to.equal(2);
    expect(tr.props.children[0].type).to.equal("th");
    expect(tr.props.children[0].props.children).to.equal("Movies listed for the vote");
    expect(tr.props.children[1].type).to.equal("th");
    expect(tr.props.children[1].props.children).to.be.undefined;
  });

  it("... with tbody containing two rows with small delete buttons", () => {
    const trs = v1.props.children[1].props.children;
    expect(trs.length).to.equal(2);
    expect(trs[0].type).to.equal("tr");
    expect(trs[0].props.children[0].type).to.equal("td");
    expect(trs[0].props.children[0].props.children).to.equal("Ascension");
    expect(trs[0].type).to.equal("tr");
    expect(trs[0].props.children[1].type).to.equal("td");
    expect(trs[0].props.children[1].props.children.type.displayName).to.equal("Button");
    expect(trs[0].props.children[1].props.children.props.bsSize).to.equal("xsmall");
    expect(trs[0].props.children[1].props.children.props.bsStyle).to.equal("link");
    expect(trs[0].props.children[1].props.children.props.children).to.equal("Delete");
    expect(trs[1].type).to.equal("tr");
    expect(trs[1].props.children[0].type).to.equal("td");
    expect(trs[1].props.children[0].props.children).to.equal("Doom");
    expect(trs[1].type).to.equal("tr");
    expect(trs[1].props.children[1].type).to.equal("td");
    expect(trs[1].props.children[1].props.children.type.displayName).to.equal("Button");
    expect(trs[1].props.children[1].props.children.props.bsSize).to.equal("xsmall");
    expect(trs[1].props.children[1].props.children.props.bsStyle).to.equal("link");
    expect(trs[1].props.children[1].props.children.props.children).to.equal("Delete");
  });

  it("renders a second-level start vote Button ", () => {
    let v2 = v.props.children[2];
    expect(v2.type.displayName).to.equal("Button");
    expect(v2.props.bsSize).to.equal("large");
    expect(v2.props.bsStyle).to.equal("primary");
    expect(v2.props.disabled).to.be.false;
    expect(v2.props.block).to.be.true;
    expect(v2.props.children).to.equal("Start vote");
  });


});
