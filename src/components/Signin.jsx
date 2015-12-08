import * as React from "react";

import { Button, Input } from "react-bootstrap";

import type { TSigninState } from "../reducers/signin";
import { SigninProptypes } from "../reducers/signin";

export default function Signin(props: TSigninState) {
  let ready = props.hostName && props.movieA && props.movieB;
  return (
    <form className="signin">
      <h3 className="signin-heading">Welcome to Movie Vote</h3>
      <Input
        className="signin-input"
        type="text"
        placeholder="Enter your name"
      />
      { ready ?
        <Button
          bsSize="large"
          bsStyle="primary"
          block={ true }
        >
          Join { props.hostName }'s vote
        </Button> :
        <Button
          bsSize="large"
          disabled={ true }
          block={ true }
        >
          No vote available to join
        </Button> }
      <Button
        bsSize="large"
        bsStyle="primary"
        block={ true }
      >
      Host a new vote
      </Button>
    </form>
  );
}

Signin.propTypes = SigninProptypes;
