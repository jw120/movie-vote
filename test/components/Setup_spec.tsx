import * as React from "react";
import { Button, ButtonInput, Input, Table } from "react-bootstrap";
import { use, expect } from "chai";
import jsxChai from "jsx-chai";
import { createRenderer } from "react-addons-test-utils";
import { ShallowRenderer } from "../../src/myTypings/shallowRenderer";
use(jsxChai);

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

  const expectedElement: JSX.Element = (
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

});
