import * as React from "react";

import { Button, Input } from "react-bootstrap";
import Entry from "./Entry";

import { ISigninPropData } from "../selectors/signin";
interface ISigninProps extends ISigninPropData {
  onJoin: (name: string) => void;
  onStartSetup: (name: string) => void;
}

// Used by Input
interface ISigninState {
  name: string;
};

class Signin extends React.Component<ISigninProps, ISigninState> {

  state: ISigninState = { name: "" };

  handleTextChange: ((e: React.SyntheticEvent) => void) = (e: React.SyntheticEvent) => {
    const target: HTMLButtonElement = e.currentTarget as HTMLButtonElement;
    this.setState({ name: target.value });
  };

  handleSubmit: ((e: React.SyntheticEvent) => void) = (e: React.SyntheticEvent) => {
    e.preventDefault();
    //  We do nothing if input is submitted (with enter), need one of the two buttons to be clicked
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
    return (
      <form
        className="signin"
        onSubmit={ this.handleSubmit }
      >
        <h3 className="signin-heading">Welcome to Movie Vote</h3>
        { this.renderInput() }
        <Entry
          hostName={ this.props.movieA && this.props.movieB && this.props.hostName }
          onJoin={ () => this.props.onJoin(this.state.name.trim()) }
          onStartSetup={ () => this.props.onStartSetup(this.state.name.trim()) }
        />
      </form>
    );
  }

}

export default Signin;
