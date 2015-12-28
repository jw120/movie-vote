/* eslint-env mocha */
/* @flow */

import * as React from "react";
import { expect } from "chai";
import { createRenderer } from "react-addons-test-utils";
import { ShallowRenderer } from "../../src/myTypings/shallowRenderer";
import dummyCallback from "../dummyCallback";

import Monitor from "../../src/components/Monitor";

const shallowRenderer: ShallowRenderer = createRenderer();

describe("Monitor component", () => {

  shallowRenderer.render(
    <Monitor
      name="Bob"
      movieA="Platoon"
      movieB="Frozen"
      scoreA={ 3 }
      scoreB={ 2 }
      queue={ [ "Ascension", "Doom"] }
      onNext={ dummyCallback }
    />
  );
  const v: JSX.Element = shallowRenderer.getRenderOutput();

  it("renders a top level .monitor div with four children", () => {
    expect(v.type).to.equal("div");
    expect(v.props.className).to.equal("monitor");
    expect(v.props.children.length).to.equal(4);
  });

  it("renders a second-level .montior-title h2", () => {
    const v0: JSX.Element = v.props.children[0];
    expect(v0.type).to.equal("h2");
    expect(v0.props.className).to.equal("monitor-title");
    expect(v0.props.children.join("")).to.equal("Bob's Movie Vote");
  });

  const v1: any = v.props.children[1];
  it("renders a second-level .monitor-current Table ", () => {
    expect(v1.type.displayName).to.equal("Table");
    expect(v1.props.className).to.equal("monitor-current");
  });

  it("... with thead and tbody children ", () => {
    expect(v1.props.children.length).to.equal(2);
    expect(v1.props.children[0].type).to.equal("thead");
    expect(v1.props.children[1].type).to.equal("tbody");
  });

  it("... with thead containing the header row ", () => {
    const tr: JSX.Element = v1.props.children[0].props.children;
    expect(tr.type).to.equal("tr");
    expect(tr.props.children.length).to.equal(2);
    expect(tr.props.children[0].type).to.equal("th");
    expect(tr.props.children[0].props.children).to.equal("Current vote");
    expect(tr.props.children[1].type).to.equal("th");
    expect(tr.props.children[1].props.children).to.be.undefined;
  });

  it("... with tbody containing two rows with scores ", () => {
    const trs: JSX.Element[] = v1.props.children[1].props.children;
    expect(trs.length).to.equal(2);
    expect(trs[0].type).to.equal("tr");
    expect(trs[0].props.children[0].type).to.equal("td");
    expect(trs[0].props.children[0].props.children).to.equal("Platoon");
    expect(trs[0].type).to.equal("tr");
    expect(trs[0].props.children[1].type).to.equal("td");
    expect(trs[0].props.children[1].props.children).to.equal(3);
    expect(trs[1].type).to.equal("tr");
    expect(trs[1].props.children[0].type).to.equal("td");
    expect(trs[1].props.children[0].props.children).to.equal("Frozen");
    expect(trs[1].type).to.equal("tr");
    expect(trs[1].props.children[1].type).to.equal("td");
    expect(trs[1].props.children[1].props.children).to.equal(2);
  });

  const v2: any = v.props.children[2];
  it("renders a second-level .monitor-queue condensed Table ", () => {
    expect(v2.type.displayName).to.equal("Table");
    expect(v2.props.className).to.equal("monitor-queue");
    expect(v2.props.condensed).to.be.true;
  });

  it("... with thead and tbody children ", () => {
    expect(v2.props.children.length).to.equal(2);
    expect(v2.props.children[0].type).to.equal("thead");
    expect(v2.props.children[1].type).to.equal("tbody");
  });

  it("... with thead containing the header row ", () => {
    let tr: JSX.Element = v2.props.children[0].props.children;
    expect(tr.type).to.equal("tr");
    expect(tr.props.children.type).to.equal("th");
    expect(tr.props.children.props.children).to.equal("Voting queue");
  });

  let trs: JSX.Element[] = v2.props.children[1].props.children;
  it("... with tbody containing two rows with queue ", () => {
    expect(trs.length).to.equal(2);
    expect(trs[0].type).to.equal("tr");
    expect(trs[0].props.children.type).to.equal("td");
    expect(trs[0].props.children.props.children).to.equal("Ascension");
    expect(trs[1].type).to.equal("tr");
    expect(trs[1].props.children.type).to.equal("td");
    expect(trs[1].props.children.props.children).to.equal("Doom");
  });

  it("renders a second-level host Button ", () => {
    let v3: any = v.props.children[3];
    expect(v3.type.displayName).to.equal("Button");
    expect(v3.props.bsSize).to.equal("large");
    expect(v3.props.bsStyle).to.equal("primary");
    expect(v3.props.disabled).to.be.false;
    expect(v3.props.block).to.be.false;
    expect(v3.props.children).to.equal("Next vote");
  });

});
