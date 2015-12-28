import * as React from "react";

import { Button, Table } from "react-bootstrap";

import { IMonitorPropData } from "../selectors/monitor";
interface IMonitorProps extends IMonitorPropData {
   onNext: () => void;
}

function row(movie: string): JSX.Element {
  return (
    <tr key={ movie }>
      <td>{ movie }</td>
    </tr>
  );
}

export default class Monitor extends React.Component<IMonitorProps, {}> {
  render(): JSX.Element {
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
          onClick={ function(): void { return this.props.onNext(); } }
        >
          Next vote
        </Button>
      </div>
    );
  }
}
