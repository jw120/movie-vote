import * as React from "react";

import { Button } from "react-bootstrap";

import { IVotingPropData } from "../selectors/voting";
interface IVotingProps extends IVotingPropData {
  onVote: (name: string) => void;
}

export default class Voting extends React.Component<IVotingProps, {}> {
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
          onClick={ () => this.props.onVote(this.props.movieA) }
        >
        { this.props.movieA }
        </Button>
        <Button
          bsSize="large"
          bsStyle={ this.props.voted !== this.props.movieA ? "primary" : "default" }
          disabled={ voted }
          block={ true }
          onClick={ () => this.props.onVote(this.props.movieB) }
        >
        { this.props.movieB }
        </Button>
      </div>
    );
  }
}
