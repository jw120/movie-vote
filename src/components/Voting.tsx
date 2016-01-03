import * as React from "react";
import { Button } from "react-bootstrap";

import { IRootData } from "../rootData";

export interface IVotingPropData {
  name: string;
  hostName: string;
  movieA: string;
  movieB: string;
  voted?: string;
}

// Select data we use from the main redux store
export function votingSelector(s: IRootData): IVotingPropData {
  return {
    name: s.name,
    hostName: s.hostName,
    movieA: s.movieA,
    movieB: s.movieB,
    voted: s.voted
  };
}

interface IVotingProps extends IVotingPropData {
  onVote: (name: string) => void;
}

export default class Voting extends React.Component<IVotingProps, {}> {

  renderButton(disabled: boolean, movie: string): JSX.Element {
    return (
      <Button
        bsSize="large"
        bsStyle={ disabled && this.props.voted !== movie ? "default" : "primary" }
        disabled={ disabled }
        block
        onClick={ () => this.props.onVote(movie) }
      >
      { movie }
      </Button>
    );
  }

  render(): JSX.Element {
    let hasVoted: boolean = this.props.voted === this.props.movieA || this.props.voted === this.props.movieB;
    return (
      <div className="voting">
        <div className="voting-label">
          { this.props.hostName }'s vote ({ this.props.name })
        </div>
        { this.renderButton(hasVoted, this.props.movieA) }
        { this.renderButton(hasVoted, this.props.movieB) }
      </div>
    );
  }
}
