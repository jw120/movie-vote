import * as React from "react";
import { Button, ButtonInput, Input, Table } from "react-bootstrap";
import { createRenderer } from "react-addons-test-utils";
import { ShallowRenderer } from "../../src/myTypings/shallowRenderer";

import * as expect from "expect";
import * as expectJSX from "expect-jsx";
expect.extend(expectJSX);

import Setup from "../../src/components/Setup";
import dummyCallback from "../dummyCallback";

let onAddSpy = expect.createSpy();
let onDeleteSpy = expect.createSpy();
let onStartSpy = expect.createSpy();

const dummyEvent: React.SyntheticEvent = { preventDefault: () => {} };

const shallowRenderer: ShallowRenderer = createRenderer();
shallowRenderer.render(
  <Setup
    queue={ [ "Ascension", "Doom"] }
    onAdd={ onAddSpy }
    onDelete={ onDeleteSpy }
    onStart={ onStartSpy }
  />
);
const actualElement: JSX.Element = shallowRenderer.getRenderOutput();

describe("Setup component", () => {

  const expectedDeleteButton: JSX.Element = (
    <Button bsSize="xsmall" bsStyle="link" onClick={ onDeleteSpy } >
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

  function expectedButton(s: string, cb: Function): JSX.Element {
    return (
      <Button bsSize="large" bsStyle="primary" block={ true } onClick={ cb }>
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
      { expectedButton("Start vote", onStartSpy) }
    </div>
  );

  it("renders", () => {
    expect(actualElement).toEqualJSX(expectedElement);
  });

  it("has a 3rd child which is a Button whose onClick calls onDelete", () => {
    console.log(actualElement.props.children[0].props.children[2]);
    const renderedForm = actualElement.props.children[0]; //.props.children[2]; //.props.children;
    expect(renderedForm.type).toEqual("form");
    renderedForm.props.onSubmit(dummyEvent);
    expect(onAddSpy).toHaveBeenCalled();
  });

  it("has a 3rd child which is a Button whose onClick calls onDelete", () => {
    const renderedStartButton = actualElement.props.children[2];
    expect(renderedStartButton.type.displayName).toEqual("Button");
    renderedStartButton.props.onClick();
    expect(onStartSpy).toHaveBeenCalled();
  });

});
