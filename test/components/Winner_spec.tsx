import * as React from "react";
import { createRenderer } from "react-addons-test-utils";
import { ShallowRenderer } from "../../src/myTypings/shallowRenderer";

import * as expect from "expect";
import * as expectJSX from "expect-jsx";
expect.extend(expectJSX);

import Winner from "../../src/components/Winner";
import Entry from "../../src/components/Entry";
import dummyCallback from "../dummyCallback";

const shallowRenderer: ShallowRenderer = createRenderer();

const expectedHostlessElement: JSX.Element = (
  <div className="winner">
    <div className="winner-announce">
      The winner is Platoon
    </div>
    <Entry
      hostName={ undefined }
      onJoin={ dummyCallback }
      onStartSetup={ dummyCallback }
    />
  </div>
);

describe("Winner component without host", () => {

  shallowRenderer.render(
    <Winner
      winner="Platoon"
      onJoin={ dummyCallback }
      onStartSetup={ dummyCallback }
    />
  );
  const renderedElement: JSX.Element = shallowRenderer.getRenderOutput();

  it("renders", () => {
    expect(renderedElement).toEqualJSX(expectedHostlessElement);
  });

});

describe("Winner component with host", () => {

  shallowRenderer.render(
    <Winner
      hostName="henry"
      winner="Platoon"
      movieA="Frozen"
      movieB="Angry men"
      onJoin={ dummyCallback }
      onStartSetup={ dummyCallback }
    />
  );
  const renderedElement: JSX.Element = shallowRenderer.getRenderOutput();

  const expectedElement: JSX.Element = (
    <div className="winner">
      <div className="winner-announce">
        The winner is Platoon
      </div>
      <Entry
        hostName="henry"
        onJoin={ dummyCallback }
        onStartSetup={ dummyCallback }
      />
    </div>
  );

  it("renders", () => {
    expect(renderedElement).toEqualJSX(expectedElement);
  });

});

describe("Winner component with host but no movies", () => {

  shallowRenderer.render(
    <Winner
      hostName="henry"
      winner="Platoon"
      onJoin={ dummyCallback }
      onStartSetup={ dummyCallback }
    />
  );
  const renderedElement: JSX.Element = shallowRenderer.getRenderOutput();

  it("renders", () => {
    expect(renderedElement).toEqualJSX(expectedHostlessElement);
  });

});
