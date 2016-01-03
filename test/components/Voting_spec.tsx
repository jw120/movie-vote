import * as React from "react";
import { Button } from "react-bootstrap";
import { createRenderer } from "react-addons-test-utils";
import { ShallowRenderer } from "../../src/myTypings/shallowRenderer";

import * as expect from "expect";
import * as expectJSX from "expect-jsx";
expect.extend(expectJSX);

import Voting from "../../src/components/Voting";
import dummyCallback from "../dummyCallback";

const onVoteSpy: Expect.Spy = expect.createSpy();

const shallowRenderer: ShallowRenderer = createRenderer();

describe("Voting component (no vote)", () => {

  shallowRenderer.render(
    <Voting
      name="Bob"
      hostName="Henry"
      movieA="Frozen"
      movieB="Doom"
      onVote={ onVoteSpy }
    />
  );
  const renderedElement: JSX.Element = shallowRenderer.getRenderOutput();

  const expectedElement: JSX.Element = (
    <div className="voting">
      <div className="voting-label">
        Henry's vote (Bob)
      </div>
      <Button
        bsSize="large" bsStyle="primary" disabled={ false } block onClick={ dummyCallback }>Frozen</Button>
      <Button
        bsSize="large" bsStyle="primary" disabled={ false } block onClick={ dummyCallback }>Doom</Button>
    </div>
  );

  it("renders", () => {
    expect(renderedElement).toEqualJSX(expectedElement);
  });

  it("contains a button whose onClick calls onVote on the first movie", () => {
    const renderedButton: JSX.Element = renderedElement.props.children[1];
    expect((renderedButton.type as any).displayName).toEqual("Button");
    renderedButton.props.onClick();
    expect(onVoteSpy).toHaveBeenCalledWith("Frozen");
  });

  it("contains a button whose onClick calls onVote on the second movie", () => {
    const renderedButton: JSX.Element = renderedElement.props.children[2];
    expect((renderedButton.type as any).displayName).toEqual("Button");
    renderedButton.props.onClick();
    expect(onVoteSpy).toHaveBeenCalledWith("Doom");
  });

});

describe("Voting component (vote for A)", () => {

  shallowRenderer.render(
    <Voting
      name="Bob"
      hostName="Henry"
      movieA="Frozen"
      movieB="Doom"
      voted="Frozen"
      onVote={ onVoteSpy }
    />
  );
  const renderedElement: JSX.Element = shallowRenderer.getRenderOutput();

  const expectedElement: JSX.Element = (
    <div className="voting">
      <div className="voting-label">
        Henry's vote (Bob)
      </div>
      <Button
        bsSize="large" bsStyle="primary" disabled block onClick={ dummyCallback }>Frozen</Button>
      <Button
        bsSize="large" bsStyle="default" disabled block onClick={ dummyCallback }>Doom</Button>
    </div>
  );

  it("renders", () => {
    expect(renderedElement).toEqualJSX(expectedElement);
  });

});

describe("Voting component (vote for B)", () => {

  shallowRenderer.render(
    <Voting
      name="Bob"
      hostName="Henry"
      movieA="Frozen"
      movieB="Doom"
      voted="Doom"
      onVote={ onVoteSpy }
    />
  );
  const renderedElement: JSX.Element = shallowRenderer.getRenderOutput();

  const expectedElement: JSX.Element = (
    <div className="voting">
      <div className="voting-label">
        Henry's vote (Bob)
      </div>
      <Button
        bsSize="large" bsStyle="default" disabled block onClick={ dummyCallback }>Frozen</Button>
      <Button
        bsSize="large" bsStyle="primary" disabled block onClick={ dummyCallback }>Doom</Button>
    </div>
  );

  it("renders", () => {
    expect(renderedElement).toEqualJSX(expectedElement);
  });

});
