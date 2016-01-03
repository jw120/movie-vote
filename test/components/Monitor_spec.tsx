import * as React from "react";
import { Button, Table } from "react-bootstrap";
import { createRenderer } from "react-addons-test-utils";
import { ShallowRenderer } from "../../src/myTypings/shallowRenderer";

import * as expect from "expect";
import * as expectJSX from "expect-jsx";
expect.extend(expectJSX);

import Monitor from "../../src/components/Monitor";

const onNextSpy: Expect.Spy = expect.createSpy();

const shallowRenderer: ShallowRenderer = createRenderer();
shallowRenderer.render(
  <Monitor
    name="Bob"
    movieA="Platoon"
    movieB="Frozen"
    scoreA={ 3 }
    scoreB={ 2 }
    queue={ [ "Ascension", "Doom"] }
    onNext={ onNextSpy }
  />
);
const renderedElement: JSX.Element = shallowRenderer.getRenderOutput();

const expectedElement: JSX.Element = (
  <div className="monitor">
    <h2 className="monitor-title">Bob's Movie Vote</h2>
    <Table className="monitor-current">
      <thead><tr><th>Current vote</th><th></th></tr></thead>
      <tbody>
        <tr><td>Platoon</td><td>3</td></tr>
        <tr><td>Frozen</td><td>2</td></tr>
      </tbody>
    </Table>
    <Table className="monitor-queue" condensed>
      <thead><tr><th>Voting queue</th></tr></thead>
      <tbody>
        <tr><td>Ascension</td></tr>
        <tr><td>Doom</td></tr>
      </tbody>
    </Table>
    <Button bsSize="large" bsStyle="primary" onClick={ onNextSpy }>
      Next vote
    </Button>
  </div>
);

describe("Monitor component", () => {

  it("renders", () => {
    expect(renderedElement).toEqualJSX(expectedElement);
  });

  it("contains a Button whose onClick calls onStart", () => {
    const renderedNextButton: JSX.Element = renderedElement.props.children[3];
    expect((renderedNextButton.type as any).displayName).toEqual("Button");
    renderedNextButton.props.onClick();
    expect(onNextSpy).toHaveBeenCalled();
  });

});
