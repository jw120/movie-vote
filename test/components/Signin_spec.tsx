import * as React from "react";
import { Input} from "react-bootstrap";
import { createRenderer } from "react-addons-test-utils";
import { ShallowRenderer } from "../../src/myTypings/shallowRenderer";

import * as expect from "expect";
import * as expectJSX from "expect-jsx";
expect.extend(expectJSX);

import Signin from "../../src/components/Signin";
import Entry from "../../src/components/Entry";
import dummyCallback from "../dummyCallback";

const shallowRenderer: ShallowRenderer = createRenderer();

describe("Signin component without host", () => {

  shallowRenderer.render(
    <Signin
      onJoin={ dummyCallback }
      onStartSetup={ dummyCallback }
    />
  );
  const renderedElement: JSX.Element = shallowRenderer.getRenderOutput();

  const expectedElement: JSX.Element = (
    <form className="signin"  onSubmit={ dummyCallback }>
      <h3 className="signin-heading">Welcome to Movie Vote</h3>
      <Input className="signin-input" type="text" value="" placeholder="Enter your name" onChange={ dummyCallback } />
      <Entry hostName={ undefined } onJoin={ dummyCallback } onStartSetup={ dummyCallback }/>
    </form>
  );

  it("renders", () => {
    expect(renderedElement).toEqualJSX(expectedElement);
  });

});

describe("Signin component with host and moives", () => {

  shallowRenderer.render(
    <Signin
      hostName="henry"
      movieA="Frozen"
      movieB="12 angry men"
      onJoin={ dummyCallback }
      onStartSetup={ dummyCallback }
    />
  );
  const renderedElement: JSX.Element = shallowRenderer.getRenderOutput();

  const expectedElement: JSX.Element = (
    <form className="signin"  onSubmit={ dummyCallback }>
      <h3 className="signin-heading">Welcome to Movie Vote</h3>
      <Input className="signin-input" type="text" value="" placeholder="Enter your name" onChange={ dummyCallback } />
      <Entry hostName="henry" onJoin={ dummyCallback } onStartSetup={ dummyCallback } />
    </form>
  );

  it("renders", () => {
    expect(renderedElement).toEqualJSX(expectedElement);
  });

});

describe("Signin component with host but missing a movie", () => {

  shallowRenderer.render(
    <Signin
      hostName="henry"
      movieA="Frozen"
      onJoin={ dummyCallback }
      onStartSetup={ dummyCallback }
    />
  );
  const renderedElement: JSX.Element = shallowRenderer.getRenderOutput();

  const expectedElement: JSX.Element = (
    <form className="signin"  onSubmit={ dummyCallback }>
      <h3 className="signin-heading">Welcome to Movie Vote</h3>
      <Input className="signin-input" type="text" value="" placeholder="Enter your name" onChange={ dummyCallback } />
      <Entry hostName={ undefined } onJoin={ dummyCallback } onStartSetup={ dummyCallback } />
    </form>
  );

  it("renders", () => {
    expect(renderedElement).toEqualJSX(expectedElement);
  });

});
