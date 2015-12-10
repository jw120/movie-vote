import * as React from "react";

import { Button, Input, Table } from "react-bootstrap";

import type { TSetupState } from "../reducers/setup";
import { SetupPropTypes } from "../reducers/setup";

function row(movie: string) {
  return (
    <tr key={ movie }>
      <td>{ movie }</td>
      <td>
        <Button
          bsSize="xsmall"
          bsStyle="link"
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default function Setup(props: TSetupState) {
  // console.log("Queue is", props.queue);
  return (
    <div className="setup">
      <form className="setup-form">
        <h3 className="setup-heading">Set up the vote</h3>
        <Input
          className="setup-input"
          type="text"
          placeholder="Add movie"
        />
      </form>

      <Table className="setup-table">
        <thead>
          <tr><th>Movies listed for the vote</th><th></th></tr>
        </thead>
        <tbody>
          { props.queue.map(row) }
        </tbody>
      </Table>

      <Button
        bsSize="large"
        bsStyle="primary"
        block={ true }
      >
        Start vote
      </Button>
    </div>
  );
}

Setup.propTypes = SetupPropTypes;
