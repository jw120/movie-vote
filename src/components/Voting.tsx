import * as React from "react";

import { Button } from "react-bootstrap";

import { VotingPropData } from "../selectors/voting";
interface VotingProps extends VotingPropData {
  onVote: (name: string) => void;
}

export default class Voting extends React.Component<VotingProps, {}> {
  render(): JSX.Element {
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
          onClick={ function(): void { return this.props.onVote(this.props.movieA); } }
        >
        { this.props.movieA }
        </Button>
        <Button
          bsSize="large"
          bsStyle={ this.props.voted !== this.props.movieA ? "primary" : "default" }
          disabled={ voted }
          block={ true }
          onClick={ function(): void { return this.props.vote(this.props.movieB); } }
        >
        { this.props.movieB }
        </Button>
      </div>
    );
  }
}
