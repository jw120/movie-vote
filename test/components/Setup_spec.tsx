import * as React from "react";
import { Button, ButtonInput, Input, Table } from "react-bootstrap";
import { createRenderer } from "react-addons-test-utils";
import { ShallowRenderer } from "../../src/myTypings/shallowRenderer";

import * as expect from "expect";
import * as expectJSX from "expect-jsx";
expect.extend(expectJSX);

import Setup from "../../src/components/Setup";
import dummyCallback from "../dummyCallback";

const onDeleteSpy: Expect.Spy = expect.createSpy();
const onStartSpy: Expect.Spy = expect.createSpy();

const shallowRenderer: ShallowRenderer = createRenderer();
shallowRenderer.render(
  <Setup
    queue={ [ "Ascension", "Doom"] }
    onAdd={ dummyCallback }
    onDelete={ onDeleteSpy }
    onStart={ onStartSpy }
  />
);
const renderedElement: JSX.Element = shallowRenderer.getRenderOutput();

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
    <Button bsSize="large" bsStyle="primary" block onClick={ cb }>
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

describe("Setup component", () => {

  it("renders", () => {
    expect(renderedElement).toEqualJSX(expectedElement);
  });

  it("contains a buttons whose onClick calls onDelete on the first movie", () => {
    const renderedButton: JSX.Element =
      renderedElement.props.children[1].props.children[1].props.children[0].props.children[1].props.children;
    expect((renderedButton.type as any).displayName).toEqual("Button");
    renderedButton.props.onClick();
    expect(onDeleteSpy).toHaveBeenCalledWith("Ascension");
  });

  it("contains a button whose onClick calls onDelete on the second movie", () => {
    const renderedButton: JSX.Element =
      renderedElement.props.children[1].props.children[1].props.children[1].props.children[1].props.children;
    expect((renderedButton.type as any).displayName).toEqual("Button");
    renderedButton.props.onClick();
    expect(onDeleteSpy).toHaveBeenCalledWith("Doom");
  });

  it("contains a Button whose onClick calls onStart", () => {
    const renderedStartButton: JSX.Element = renderedElement.props.children[2];
    expect((renderedStartButton.type as any).displayName).toEqual("Button");
    renderedStartButton.props.onClick();
    expect(onStartSpy).toHaveBeenCalled();
  });

});
