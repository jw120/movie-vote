import * as React from "react";

import { Button, Table } from "react-bootstrap";

import type { TMonitorState } from "../reducers/monitor";

function row(movie: string) {
  return (
    <tr key={ movie }>
      <td>{ movie }</td>
    </tr>
  );
}

export default function Monitor(props: TMonitorState) {
  return (
    <div className="monitor">

      <div className="monitor-title">
        <h2>Eve's movie vote</h2>
      </div>

      <Table className="monitor-current">
        <thead>
          <tr><th>Current vote</th><th></th></tr>
        </thead>
        <tbody>
          <tr>
            <td>{ props.movieA }</td>
            <td>{ props.scoreA }</td>
          </tr>
          <tr>
            <td>{ props.movieB }</td>
            <td>{ props.scoreB }</td>
          </tr>
        </tbody>
      </Table>

      <Table className="monitor-queue" condensed>
        <thead>
          <tr><th>Voting queue </th></tr>
        </thead>
        <tbody>
          { props.queue.map(row) }
        </tbody>
      </Table>

      <Button bsSize="large" bsStyle="primary" >Next Vote</Button>
    </div>
  );
}
