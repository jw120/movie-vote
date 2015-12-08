import * as React from "react";

import { Button } from "react-bootstrap";

import type { TVotingState } from "../reducers/voting";
import { VotingPropTypes } from "../reducers/voting";

export default function Voting(props: TVotingState) {
  return (
    <div className="voting">
      <div className="voting-label">
        { props.hostName }'s vote ({ props.name })
      </div>
      <Button
        bsSize="large"
        bsStyle="primary"
        block={ true }
      >
      { props.movieA }
      </Button>
      <Button
        bsSize="large"
        bsStyle="primary"
        block={ true }
      >
      { props.movieB }
      </Button>
    </div>
  );
}

Voting.propTypes = VotingPropTypes;
