import * as React from "react";
import { Button, Input} from "react-bootstrap";
import { createRenderer } from "react-addons-test-utils";
import { ShallowRenderer } from "../../src/myTypings/shallowRenderer";

import * as expect from "expect";
import * as expectJSX from "expect-jsx";
expect.extend(expectJSX);

import Signin from "../../src/components/Signin";
import dummyCallback from "../dummyCallback";

const onJoinSpy: Expect.Spy = expect.createSpy();
const onStartSetupSpy: Expect.Spy = expect.createSpy();

const shallowRenderer: ShallowRenderer = createRenderer();

function expectedElementWith(joinButton: JSX.Element): JSX.Element {
  return (
    <form className="signin"  onSubmit={ dummyCallback }>
      <h3 className="signin-heading">Welcome to Movie Vote</h3>
      <Input className="signin-input" type="text" value="" placeholder="Enter your name" onChange={ dummyCallback } />
      { joinButton }
      <Button bsSize="large" bsStyle="primary" block={ true } onClick={ onStartSetupSpy }>
      Host a new vote
      </Button>
    </form>
  );
}

const inactiveJoinButton: JSX.Element = (
  <Button bsSize="large" disabled={ true } block={ true }>
    No vote available to join
  </Button>
);

const activeJoinButton: JSX.Element = (
  <Button bsSize="large" bsStyle="primary" block={ true } onClick={ onJoinSpy }>
    Join henry's vote
  </Button>
);

describe("Signin component without host", () => {

  shallowRenderer.render(
    <Signin
      onJoin={ onJoinSpy }
      onStartSetup={ onStartSetupSpy }
    />
  );
  const renderedElement: JSX.Element = shallowRenderer.getRenderOutput();

  const expectedElement: JSX.Element = expectedElementWith(inactiveJoinButton);

  it("renders", () => {
    expect(renderedElement).toEqualJSX(expectedElement);
  });

  it("contains a Button whose onClick calls onStartSetup", () => {
    const renderedStartButton: JSX.Element = renderedElement.props.children[3];
    expect((renderedStartButton.type as any).displayName).toEqual("Button");
    renderedStartButton.props.onClick();
    expect(onStartSetupSpy).toHaveBeenCalled();
  });

});

describe("Signin component with host", () => {

  shallowRenderer.render(
    <Signin
      hostName="henry"
      movieA="Frozen"
      movieB="12 angry men"
      onJoin={ onJoinSpy }
      onStartSetup={ onStartSetupSpy }
    />
  );
  const renderedElement: JSX.Element = shallowRenderer.getRenderOutput();

  const expectedElement: JSX.Element = expectedElementWith(activeJoinButton);

  it("renders", () => {
    expect(renderedElement).toEqualJSX(expectedElement);
  });

  it("contains a Button whose onClick calls onJoin", () => {
    const renderedStartButton: JSX.Element = renderedElement.props.children[2];
    expect((renderedStartButton.type as any).displayName).toEqual("Button");
    renderedStartButton.props.onClick();
    expect(onJoinSpy).toHaveBeenCalled();
  });

  it("contains a Button whose onClick calls onStartSetup", () => {
    const renderedStartButton: JSX.Element = renderedElement.props.children[3];
    expect((renderedStartButton.type as any).displayName).toEqual("Button");
    renderedStartButton.props.onClick();
    expect(onStartSetupSpy.calls.length).toEqual(2); // called for first time above
  });
});
