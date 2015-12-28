import * as React from "react";

import { Button, Input } from "react-bootstrap";

import { SigninPropData } from "../selectors/signin";
interface SigninProps extends SigninPropData {
  onJoin: (name: string) => void;
  onStartSetup: (name: string) => void;
}

interface SigninState {
  name: string;
};

class Signin extends React.Component<SigninProps, SigninState> {

  state: SigninState = { name: "" };

  handleTextChange: ((e: React.SyntheticEvent) => void) = (e: React.SyntheticEvent) => {
    const target: HTMLButtonElement = e.currentTarget as HTMLButtonElement;
    this.setState({ name: target.value });
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
        onClick={ () => this.props.onJoin(this.state.name.trim()) }
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
        onClick={ () => this.props.onStartSetup(this.state.name.trim()) }
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
