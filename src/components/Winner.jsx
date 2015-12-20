/* @flow */

import React from "react";

import { Button } from "react-bootstrap";

import type { TWinnerProps } from "../reducers/winner";
import type { TActionCreator } from "../actionCreators";
import { WinnerPropTypes } from "../reducers/winner";

export default function Winner(props: TWinnerProps & TActionCreator): React.Element {
  let ready: boolean = !!(props.hostName && props.movieA && props.movieB);
  return (
    <div className="winner">
      <div className="winner-announce">
        The winner is { props.winner }
      </div>
      { ready ?
        <Button
          bsSize="large"
          bsStyle="primary"
          block={ true }
          onClick={ props.join }
        >
        Join { props.hostName }'s vote
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
        onClick={ props.startSetup }
      >
      Host a new vote
      </Button>
    </div>
  );
}

Winner.propTypes = WinnerPropTypes;
