/* eslint-env mocha */
/* @flow */

import React from "react";
import { Button, ButtonInput, Input, Table } from "react-bootstrap";
import chai, { expect } from "chai";
import jsxChai from "jsx-chai";
import { createRenderer } from "react-addons-test-utils";
chai.use(jsxChai);

import Setup from "../../src/components/Setup";

function dummyCallback() {
  return {};
}

describe("Setup component", () => {

  const shallowRenderer = createRenderer();
  shallowRenderer.render(
    <Setup
      name="Bob"
      queue={ [ "Ascension", "Doom"] }
    />
  );
  const actualElement = shallowRenderer.getRenderOutput();

  const expectedElement = (
    <div className="setup">
      <form
        className="setup-form"
        onSubmit={ dummyCallback }
      >
        <h3 className="setup-heading">Set up the vote</h3>
        <Input
          className="setup-input"
          type="text"
          value=""
          onChange={ dummyCallback }
          placeholder="Add movie"
        />
        <ButtonInput
          type="submit"
          bsSize="large"
          bsStyle="primary"
          block={ false }
        >
          Add movie
        </ButtonInput>
      </form>
      <Table className="setup-table">
        <thead>
          <tr><th>Movies listed for the vote</th><th></th></tr>
        </thead>
        <tbody>
          <tr key="Ascension">
            <td>Ascension</td>
            <td>
              <Button
                bsSize="xsmall"
                bsStyle="link"
                onClick={ dummyCallback }
              >
                Delete
              </Button>
            </td>
          </tr>
          <tr key="Doom">
            <td>Doom</td>
            <td>
              <Button
                bsSize="xsmall"
                bsStyle="link"
                onClick={ dummyCallback }
              >
                Delete
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <Button
        bsSize="large"
        bsStyle="primary"
        block={ true }
        onClick={ dummyCallback }
      >
        Start vote
      </Button>
    </div>
  );

  it("renders", () => {
    expect(actualElement).to.deep.equal(expectedElement);
  });

  // const v0 = v.props.children[0];
  // it("renders a second-level .setup-form form with two children", () => {
  //   expect(v0.type).to.equal("form");
  //   expect(v0.props.className).to.equal("setup-form");
  //   expect(v0.props.children.length).to.equal(2);
  // });
  //
  // it("... with a .setup-heading h3", () => {
  //   expect(v0.props.children[0].type).to.equal("h3");
  //   expect(v0.props.children[0].props.className).to.equal("setup-heading");
  //   expect(v0.props.children[0].props.children).to.equal("Set up the vote");
  // });
  //
  // it("... with a .setup-input Input", () => {
  //   expect(v0.props.children[1].type.name).to.equal("Input");
  //   expect(v0.props.children[1].props.className).to.equal("setup-input");
  //   expect(v0.props.children[1].props.type).to.equal("text");
  //   expect(v0.props.children[1].props.placeholder).to.equal("Add movie");
  //   expect(v0.props.children[1].props.children).to.be.undefined;
  // });
  //
  // const v1 = v.props.children[1];
  // it("renders a second-level .setup-table Table ", () => {
  //   expect(v1.type.displayName).to.equal("Table");
  //   expect(v1.props.className).to.equal("setup-table");
  // });
  //
  // it("... with thead and tbody children ", () => {
  //   expect(v1.props.children.length).to.equal(2);
  //   expect(v1.props.children[0].type).to.equal("thead");
  //   expect(v1.props.children[1].type).to.equal("tbody");
  // });
  //
  // it("... with thead containing the header row ", () => {
  //   const tr = v1.props.children[0].props.children;
  //   expect(tr.type).to.equal("tr");
  //   expect(tr.props.children.length).to.equal(2);
  //   expect(tr.props.children[0].type).to.equal("th");
  //   expect(tr.props.children[0].props.children).to.equal("Movies listed for the vote");
  //   expect(tr.props.children[1].type).to.equal("th");
  //   expect(tr.props.children[1].props.children).to.be.undefined;
  // });
  //
  // it("... with tbody containing two rows with small delete buttons", () => {
  //   const trs = v1.props.children[1].props.children;
  //   expect(trs.length).to.equal(2);
  //   expect(trs[0].type).to.equal("tr");
  //   expect(trs[0].props.children[0].type).to.equal("td");
  //   expect(trs[0].props.children[0].props.children).to.equal("Ascension");
  //   expect(trs[0].type).to.equal("tr");
  //   expect(trs[0].props.children[1].type).to.equal("td");
  //   expect(trs[0].props.children[1].props.children.type.displayName).to.equal("Button");
  //   expect(trs[0].props.children[1].props.children.props.bsSize).to.equal("xsmall");
  //   expect(trs[0].props.children[1].props.children.props.bsStyle).to.equal("link");
  //   expect(trs[0].props.children[1].props.children.props.children).to.equal("Delete");
  //   expect(trs[1].type).to.equal("tr");
  //   expect(trs[1].props.children[0].type).to.equal("td");
  //   expect(trs[1].props.children[0].props.children).to.equal("Doom");
  //   expect(trs[1].type).to.equal("tr");
  //   expect(trs[1].props.children[1].type).to.equal("td");
  //   expect(trs[1].props.children[1].props.children.type.displayName).to.equal("Button");
  //   expect(trs[1].props.children[1].props.children.props.bsSize).to.equal("xsmall");
  //   expect(trs[1].props.children[1].props.children.props.bsStyle).to.equal("link");
  //   expect(trs[1].props.children[1].props.children.props.children).to.equal("Delete");
  // });
  //
  // it("renders a second-level start vote Button ", () => {
  //   let v2 = v.props.children[2];
  //   expect(v2.type.displayName).to.equal("Button");
  //   expect(v2.props.bsSize).to.equal("large");
  //   expect(v2.props.bsStyle).to.equal("primary");
  //   expect(v2.props.disabled).to.be.false;
  //   expect(v2.props.block).to.be.true;
  //   expect(v2.props.children).to.equal("Start vote");
  // });


});
