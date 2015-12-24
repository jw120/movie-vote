/* @flow */

import * as React from "react";

import { Button, ButtonInput, Input, Table } from "react-bootstrap";

import { TSetupProps } from "../reducers/setup";
import { TActionCreator } from "../actionCreators";
import { SetupPropTypes } from "../reducers/setup";

type TSetupState = {
  movie: string;
};

function renderRow(movie: string): JSX.Element {
  return (
    <tr key={ movie }>
      <td>{ movie }</td>
      <td>
        <Button
          bsSize="xsmall"
          bsStyle="link"
          onClick={ this.handleDeleteClick(movie) }
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}

class Setup extends React.Component<TSetupProps & TActionCreator, TSetupState> {

  // $FlowSuppressExperimentalWarning
  static propTypes = SetupPropTypes;

  // $FlowSuppressExperimentalWarning
  state: TSetupState = { movie: "" };

  props: TSetupProps & TActionCreator;

  // $FlowSuppressExperimentalWarning
  handleTextChange: ((e: React.SyntheticEvent) => void) = (e: React.SyntheticEvent) => {
    this.setState({ movie: e.currentTarget.value });
  };

  // $FlowSuppressExperimentalWarning
  handleStartClick: (() => void) = () => {
    this.props.hostStart();
  };

  // $FlowSuppressExperimentalWarning
  handleDeleteClick = (movie: string) => () => {
    this.props.hostQueueDelete(movie);
  };

  // $FlowSuppressExperimentalWarning
  handleSubmit: ((e: React.SyntheticEvent) => void) = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.props.hostQueueAdd(this.state.movie.trim());
    this.setState({ movie: "" });
  };

  renderTable(): JSX.Element {
    return (
      <Table className="setup-table">
        <thead>
          <tr><th>Movies listed for the vote</th><th></th></tr>
        </thead>
        <tbody>
          { this.props.queue.map(renderRow, this) }
        </tbody>
      </Table>
    );
  }

  renderStartButton(): JSX.Element {
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

  renderAddButtonInput(): JSX.Element {
    return (
      <ButtonInput
        type="submit"
        bsSize="large"
        bsStyle="primary"
      >
        Add movie
      </ButtonInput>
    );
  }


  render(): JSX.Element {
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
