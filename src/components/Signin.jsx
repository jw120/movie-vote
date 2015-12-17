/* @flow */

import * as React from "react";

import { Button, Input } from "react-bootstrap";

// import type { TSigninProps } from "../reducers/signin";
// import type { TActionCreator } from "../actionCreators";
import { SigninProptypes } from "../reducers/signin";

type TSigninState = {
  name: string;
};

class Signin extends React.Component {

  static propTypes = SigninProptypes;

  state: TSigninState = { name: "" };

  handleTextChange: ((e: React.Event) => void) = (e: React.Event) => {
    this.setState({ name: e.currentTarget.value });
  };

  handleJoinClick: (() => void) = () => {
    this.props.join(this.state.name.trim());
  };

  handleSetupClick: (() => void) = () => {
    this.props.startSetup(this.state.name.trim());
  };

  render(): React.Element {
    let ready: boolean = !!(this.props.hostName && this.props.movieA && this.props.movieB);
    return (
      <form className="signin">
        <h3 className="signin-heading">Welcome to Movie Vote</h3>
        <Input
          className="signin-input"
          type="text"
          value={ this.state.author }
          placeholder="Enter your name"
          onChange={ this.handleTextChange }
        />
        { ready ?
          <Button
            bsSize="large"
            bsStyle="primary"
            block={ true }
            onClick={ this.handleJoinClick }
          >
            Join { this.props.hostName }'s vote
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
          onClick={ this.handleSetupClick }
        >
        Host a new vote
        </Button>
      </form>
    );
  }

}

export default Signin;
