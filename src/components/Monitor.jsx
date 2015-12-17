/* @flow */

import * as React from "react";

import { Button, Table } from "react-bootstrap";

import type { TMonitorProps } from "../reducers/monitor";
import type { TActionCreator } from "../actionCreators";
import { MonitorPropTypes } from "../reducers/monitor";

function row(movie: string) {
  return (
    <tr key={ movie }>
      <td>{ movie }</td>
    </tr>
  );
}

export default function Monitor(props: TMonitorProps & TActionCreator): React.Element {
  return (
    <div className="monitor">

      <h2 className="monitor-title">{ props.name }'s Movie Vote</h2>

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

      <Table
        className="monitor-queue"
        condensed={ true }
      >
        <thead>
          <tr><th>Voting queue</th></tr>
        </thead>
        <tbody>
          { props.queue.map(row) }
        </tbody>
      </Table>

      <Button
        bsSize="large"
        bsStyle="primary"
        onClick={ function() { return props.next(); } }
      >
        Next vote
      </Button>
    </div>
  );
}

Monitor.propTypes = MonitorPropTypes;
