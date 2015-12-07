import * as React from "react";

import { Button } from "react-bootstrap";

import type { TWinnerState } from "../reducers/winner";

export default function Winner(props: TWinnerState) {
  let ready = props.hostName && props.movieA && props.movieB;
  return (
    <div className="winner">
      <div className="winner-announce">
        The winner is { props.winner }
      </div>
      { ready ? <Button bsSize="large" bsStyle="primary" block>Join {props.hostName}'s vote</Button>
              : <Button bsSize="large" disabled block>No vote available to join</Button> }
      <Button bsSize="large" bsStyle="primary" block>Host a new vote</Button>
    </div>
  );
}
