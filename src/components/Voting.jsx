/* @flow */

import * as React from "react";

import { Button } from "react-bootstrap";

// import type { TVotingProps } from "../reducers/voting";
// import type { TActionCreator } from "../actionCreators";
import { VotingPropTypes } from "../reducers/voting";

export default function Voting(props: Object /* TVotingProps & TActionCreator */): React.Element {
  let voted: boolean = props.voted === props.movieA || props.voted === props.movieB;
  return (
    <div className="voting">
      <div className="voting-label">
        { props.hostName }'s vote ({ props.name })
      </div>
      <Button
        bsSize="large"
        bsStyle={ props.voted !== props.movieB ? "primary" : "default" }
        disabled={ voted }
        block={ true }
        onClick={ function() { return props.vote(props.movieA); } }
      >
      { props.movieA }
      </Button>
      <Button
        bsSize="large"
        bsStyle={ props.voted !== props.movieA ? "primary" : "default" }
        disabled={ voted }
        block={ true }
        onClick={ function() { return props.vote(props.movieB); } }
      >
      { props.movieB }
      </Button>
    </div>
  );
}

Voting.propTypes = VotingPropTypes;
