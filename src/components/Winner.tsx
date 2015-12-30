import * as React from "react";

import { Button } from "react-bootstrap";

import { IWinnerPropData } from "../selectors/winner";
interface IWinnerProps extends IWinnerPropData {
  onJoin: (name: string) => void;
  onStartSetup: (name: string) => void;
}

export default class Winner extends React.Component<IWinnerProps, {}> {
  render(): JSX.Element {
    let ready: boolean = !!(this.props.hostName && this.props.movieA && this.props.movieB);
    return (
      <div className="winner">
        <div className="winner-announce">
          The winner is { this.props.winner }
        </div>
        <Button
          bsSize="large"
          bsStyle={ ready ? "primary" : "default" }
          disabled={ !ready }
          block={ true }
          onClick={ this.props.onJoin }
        >
          { ready ? `Join ${this.props.hostName}s vote` : "No vote available to join" }
        </Button>
        <Button
          bsSize="large"
          bsStyle="primary"
          block={ true }
          onClick={ this.props.onStartSetup }
        >
          Host a new vote
        </Button>
      </div>
    );
  }
}
