import * as React from "react";
import { Button } from "react-bootstrap";
import { createRenderer } from "react-addons-test-utils";
import { ShallowRenderer } from "../../src/myTypings/shallowRenderer";

import * as expect from "expect";
import * as expectJSX from "expect-jsx";
expect.extend(expectJSX);

import Entry from "../../src/components/Entry";
import dummyCallback from "../dummyCallback";

const onJoinSpy: Expect.Spy = expect.createSpy();
const onStartSetupSpy: Expect.Spy = expect.createSpy();

const shallowRenderer: ShallowRenderer = createRenderer();

const expectedHostlessElement: JSX.Element = (
  <div className="entry">
    <Button bsSize="large" disabled block>No vote available to join</Button>
    <Button bsSize="large" bsStyle="primary" block onClick={ dummyCallback }>
      Host a new vote
    </Button>
  </div>
);

describe("Entry component without host", () => {

  shallowRenderer.render(
    <Entry
      onJoin={ onJoinSpy }
      onStartSetup={ onStartSetupSpy }
    />
  );
  const renderedElement: JSX.Element = shallowRenderer.getRenderOutput();

  it("renders", () => {
    expect(renderedElement).toEqualJSX(expectedHostlessElement);
  });

  it("contains a Button whose onClick calls onStartSetup", () => {
    const renderedStartButton: JSX.Element = renderedElement.props.children[1];
    expect((renderedStartButton.type as any).displayName).toEqual("Button");
    renderedStartButton.props.onClick();
    expect(onStartSetupSpy).toHaveBeenCalled();
  });

});

describe("Entry component with undefined host", () => {

  shallowRenderer.render(
    <Entry
      hostName={ undefined }
      onJoin={ onJoinSpy }
      onStartSetup={ onStartSetupSpy }
    />
  );
  const renderedElement: JSX.Element = shallowRenderer.getRenderOutput();

  it("renders", () => {
    expect(renderedElement).toEqualJSX(expectedHostlessElement);
  });

});

describe("Entry component with empty host", () => {

  shallowRenderer.render(
    <Entry
      hostName=""
      onJoin={ onJoinSpy }
      onStartSetup={ onStartSetupSpy }
    />
  );
  const renderedElement: JSX.Element = shallowRenderer.getRenderOutput();

  it("renders", () => {
    expect(renderedElement).toEqualJSX(expectedHostlessElement);
  });

});

describe("Entry component with host", () => {

  shallowRenderer.render(
    <Entry
      hostName="henry"
      onJoin={ onJoinSpy }
      onStartSetup={ onStartSetupSpy }
    />
  );
  const renderedElement: JSX.Element = shallowRenderer.getRenderOutput();

  const expectedElement: JSX.Element = (
    <div className="entry">
      <Button bsSize="large" bsStyle="primary" block onClick={ onJoinSpy }>
        Join henry's vote
      </Button>
      <Button bsSize="large" bsStyle="primary" block onClick={ dummyCallback }>
        Host a new vote
      </Button>
    </div>
  );

  it("renders", () => {
    expect(renderedElement).toEqualJSX(expectedElement);
  });

  it("contains a Button whose onClick calls onJoin", () => {
    const renderedStartButton: JSX.Element = renderedElement.props.children[0];
    expect((renderedStartButton.type as any).displayName).toEqual("Button");
    renderedStartButton.props.onClick();
    expect(onJoinSpy).toHaveBeenCalled();
  });

  it("contains a Button whose onClick calls onStartSetup", () => {
    const renderedStartButton: JSX.Element = renderedElement.props.children[1];
    expect((renderedStartButton.type as any).displayName).toEqual("Button");
    renderedStartButton.props.onClick();
    expect(onStartSetupSpy.calls.length).toEqual(2); // called for first time above
  });

});
