/* @flow */

import * as React from "react";

import { Button } from "react-bootstrap";

import { TVotingProps } from "../reducers/voting";
import { TActionCreator } from "../actionCreators";
import { VotingPropTypes } from "../reducers/voting";
type NoState = {};

// export default function Voting(props: TVotingProps & TActionCreator): JSX.Element {
export default class Voting extends React.Component<TVotingProps, NoState> {
  render() {
    let voted: boolean = this.props.voted === this.props.movieA || this.props.voted === this.props.movieB;
    return (
      <div className="voting">
        <div className="voting-label">
          { this.props.hostName }'s vote ({ this.props.name })
        </div>
        <Button
          bsSize="large"
          bsStyle={ this.props.voted !== this.props.movieB ? "primary" : "default" }
          disabled={ voted }
          block={ true }
          onClick={ function() { return this.props.vote(this.props.movieA); } }
        >
        { this.props.movieA }
        </Button>
        <Button
          bsSize="large"
          bsStyle={ this.props.voted !== this.props.movieA ? "primary" : "default" }
          disabled={ voted }
          block={ true }
          onClick={ function() { return this.props.vote(this.props.movieB); } }
        >
        { this.props.movieB }
        </Button>
      </div>
    );
  }
}

// Voting.propTypes = VotingPropTypes;
