/* @flow */

import * as React from "react";

import { Button } from "react-bootstrap";

import { TWinnerProps } from "../reducers/winner";
import { TActionCreator } from "../actionCreators";
import { WinnerPropTypes } from "../reducers/winner";
type NoState = {};

//export default function Winner(props: TWinnerProps & TActionCreator): JSX.Element {
export default class Winner extends React.Component<TWinnerProps & TActionCreator, NoState> {
  render() {
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
            onClick={ this.props.join }
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
          onClick={ this.props.startSetup }
        >
        Host a new vote
        </Button>
      </div>
    );
  }
}

// Winner.propTypes = WinnerPropTypes;
