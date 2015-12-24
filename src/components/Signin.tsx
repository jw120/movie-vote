/* @flow */

import * as React from "react";

import { Button, Input } from "react-bootstrap";

import { TSigninProps } from "../reducers/signin";
import { TActionCreator } from "../actionCreators";
import { SigninProptypes } from "../reducers/signin";

type TSigninState = {
  name: string;
};

class Signin extends React.Component<TSigninProps & TActionCreator, TSigninState> {

  // $FlowSuppressExperimentalWarning
  static propTypes = SigninProptypes;

  // $FlowSuppressExperimentalWarning
  state: TSigninState = { name: "" };

  props: TSigninProps & TActionCreator;

  // $FlowSuppressExperimentalWarning
  handleTextChange: ((e: React.SyntheticEvent) => void) = (e: React.SyntheticEvent) => {
    this.setState({ name: e.currentTarget.value });
  };

  // $FlowSuppressExperimentalWarning
  handleJoinClick: (() => void) = () => {
    this.props.join(this.state.name.trim());
  };

  // $FlowSuppressExperimentalWarning
  handleSetupClick: (() => void) = () => {
    this.props.startSetup(this.state.name.trim());
  };

  // $FlowSuppressExperimentalWarning
  handleSubmit: ((e: React.SyntheticEvent) => void) = (e: React.SyntheticEvent) => {
    e.preventDefault();
    //  Do nothing
  };

  renderInput(): JSX.Element {
    return (
      <Input
        className="signin-input"
        type="text"
        value={ this.state.name }
        placeholder="Enter your name"
        onChange={ this.handleTextChange }
      />
    );
  }

  renderActiveJoinButton(): JSX.Element {
    return (
      <Button
        bsSize="large"
        bsStyle="primary"
        block={ true }
        onClick={ this.handleJoinClick }
      >
        Join { this.props.hostName }'s vote
      </Button>
    );
  }

  renderInactiveJoinButton(): JSX.Element {
    return (
      <Button
        bsSize="large"
        disabled={ true }
        block={ true }
      >
        No vote available to join
      </Button>
    );
  }

  renderHostButton(): JSX.Element {
    return (
      <Button
        bsSize="large"
        bsStyle="primary"
        block={ true }
        onClick={ this.handleSetupClick }
      >
      Host a new vote
      </Button>
    );
  }

  render(): JSX.Element {
    let ready: boolean = !!(this.props.hostName && this.props.movieA && this.props.movieB);
    return (
      <form
        className="signin"
        onSubmit={ this.handleSubmit }
      >
        <h3 className="signin-heading">Welcome to Movie Vote</h3>
        { this.renderInput() }
        { ready ? this.renderActiveJoinButton() : this.renderInactiveJoinButton() }
        { this.renderHostButton() }
      </form>
    );
  }

}

export default Signin;
