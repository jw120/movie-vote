/* @flow */

import * as React from "react";

import { Button, Table } from "react-bootstrap";

export type MonitorProps = {
   name: string,
   movieA: string,
   movieB: string,
   queue: string[],
   scoreA: number,
   scoreB: number,
   onNextClick: () => void;
}

function row(movie: string) {
  return (
    <tr key={ movie }>
      <td>{ movie }</td>
    </tr>
  );
}

export default class Monitor extends React.Component<MonitorProps, {}> {
// export default function Monitor(props: TMonitorProps & TActionCreator): JSX.Element {
  render() {
  return (
    <div className="monitor">

      <h2 className="monitor-title">{ this.props.name }'s Movie Vote</h2>

      <Table className="monitor-current">
        <thead>
          <tr><th>Current vote</th><th></th></tr>
        </thead>
        <tbody>
          <tr>
            <td>{ this.props.movieA }</td>
            <td>{ this.props.scoreA }</td>
          </tr>
          <tr>
            <td>{ this.props.movieB }</td>
            <td>{ this.props.scoreB }</td>
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
          { this.props.queue.map(row) }
        </tbody>
      </Table>

      <Button
        bsSize="large"
        bsStyle="primary"
        onClick={ function() { return this.props.onNextClick(); } }
      >
        Next vote
      </Button>
    </div>
  );
}
}

// Monitor.propTypes = MonitorPropTypes;
