import * as React from "react";
import { Button, ButtonInput, Input, Table } from "react-bootstrap";
import { createRenderer } from "react-addons-test-utils";
import { ShallowRenderer } from "../../src/myTypings/shallowRenderer";

import * as expect from "expect";
import * as expectJSX from "expect-jsx";
expect.extend(expectJSX);

import Setup from "../../src/components/Setup";
import dummyCallback from "../dummyCallback";

describe("Setup component", () => {

  const shallowRenderer: ShallowRenderer = createRenderer();
  shallowRenderer.render(
    <Setup
      queue={ [ "Ascension", "Doom"] }
      onAdd={ dummyCallback }
      onDelete={ dummyCallback }
      onStart={ dummyCallback }
    />
  );
  const actualElement: JSX.Element = shallowRenderer.getRenderOutput();

  const expectedDeleteButton: JSX.Element = (
    <Button bsSize="xsmall" bsStyle="link" onClick={ dummyCallback } >
      Delete
    </Button>
  );

  function expectedButtonInput(s: string): JSX.Element {
    return (
      <ButtonInput type="submit" bsSize="large" bsStyle="primary">
        { s }
      </ButtonInput>
    );
  }

  function expectedButton(s: string): JSX.Element {
    return (
      <Button bsSize="large" bsStyle="primary" block={ true } onClick={ dummyCallback }>
      { s }
      </Button>
    );
  }

  const expectedElement: JSX.Element = (
    <div className="setup">
      <form className="setup-form" onSubmit={ dummyCallback } >
        <h3 className="setup-heading">Set up the vote</h3>
        <Input className="setup-input" type="text" value="" onChange={ dummyCallback } placeholder="Add movie" />
        { expectedButtonInput("Add movie") }
      </form>
      <Table className="setup-table">
        <thead><tr><th>Movies listed for the vote</th><th></th></tr></thead>
        <tbody>
          <tr key="Ascension"><td>Ascension</td><td>{ expectedDeleteButton }</td></tr>
          <tr key="Doom"><td>Doom</td><td>{ expectedDeleteButton }</td></tr>
        </tbody>
      </Table>
      { expectedButton("Start vote") }
    </div>
  );

  it("renders", () => {
    expect(actualElement).toEqualJSX(expectedElement);
  });

});
