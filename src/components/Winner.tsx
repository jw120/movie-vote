/* @flow */

import * as React from "react";

import { Button } from "react-bootstrap";

import { WinnerPropData } from "../selectors/winner";
interface WinnerProps extends WinnerPropData {
  onJoin: (name: string) => void;
  onStartSetup: (name: string) => void;
}

export default class Winner extends React.Component<WinnerProps, {}> {
  render(): JSX.Element {
    let ready: boolean = !!(this.props.hostName && this.props.movieA && this.props.movieB);
    return (
      <div className="winner">
        <div className="winner-announce">
          The winner is { this.props.winner }
        </div>
        { ready ?
          <Button
            bsSize="large"
            bsStyle="primary"
            block={ true }
            onClick={ this.props.onJoin }
          >
          Join { this.props.hostName }'s vote
          </Button> :
          <Button
            bsSize="large"
            disabled={ true }
            block={ true }
          >
          No vote available to join
          </Button>
        }
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
