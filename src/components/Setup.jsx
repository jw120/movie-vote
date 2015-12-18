/* @flow */

import * as React from "react";

import { Button, ButtonInput, Input, Table } from "react-bootstrap";

import type { TSetupProps } from "../reducers/setup";
import type { TActionCreator } from "../actionCreators";
import { SetupPropTypes } from "../reducers/setup";

type TSetupState = {
  movie: string;
};

class Setup extends React.Component<TSetupProps & TActionCreator, TSetupState> {

  // $FlowSuppressExperimentalWarning
  static propTypes = SetupPropTypes;

  // $FlowSuppressExperimentalWarning
  state: TSetupState = { movie: "" };

  props: TSetupProps & TActionCreator;

  // $FlowSuppressExperimentalWarning
  handleTextChange: ((e: React.Event) => void) = (e: React.Event) => {
    this.setState({ movie: e.currentTarget.value });
  };

  // $FlowSuppressExperimentalWarning
  handleStartClick: (() => void) = () => {
    this.props.hostStart(this.state.movie.trim());
  };

  // $FlowSuppressExperimentalWarning
  handleSubmit: ((e: React.Event) => void) = (e: React.Event) => {
    e.preventDefault();
    this.props.hostQueueAdd(this.state.movie.trim());
    this.setState({ movie: "" });
  };

  renderRow(movie: string): React.Element {
    return (
      <tr key={ movie }>
        <td>{ movie }</td>
        <td>
          <Button
            bsSize="xsmall"
            bsStyle="link"
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  }

  renderTable(): React.Element {
    return (
      <Table className="setup-table">
        <thead>
          <tr><th>Movies listed for the vote</th><th></th></tr>
        </thead>
        <tbody>
          { this.props.queue.map(this.renderRow) }
        </tbody>
      </Table>
    );
  }

  renderStartButton(): React.Element {
    return (
      <Button
        bsSize="large"
        bsStyle="primary"
        block={ true }
        onClick={ this.handleStartClick }
      >
        Start vote
      </Button>
    );
  }

  renderAddButtonInput(): React.Element {
    return (
      <ButtonInput
        type="submit"
        bsSize="large"
        bsStyle="primary"
        block={ false }
      >
        Add movie
      </ButtonInput>
    );
  }


  render(): React.Element {
    return (
      <div className="setup">
        <form
          className="setup-form"
          onSubmit={ this.handleSubmit }
        >
          <h3 className="setup-heading">Set up the vote</h3>
          <Input
            className="setup-input"
            type="text"
            value={ this.state.movie }
            placeholder="Add movie"
            onChange={ this.handleTextChange }
          />
          { this.renderAddButtonInput() }
        </form>
        { this.renderTable() }
        { this.renderStartButton() }
      </div>
    );
  }
}

export default Setup;
