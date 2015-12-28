import * as React from "react";

import { Button, ButtonInput, Input, Table } from "react-bootstrap";

import { SetupPropData } from "../selectors/setup";
interface SetupProps extends SetupPropData {
   onDelete: (movie: string) => void;
   onAdd: (movie: string) => void;
   onStart: () => void;
}

interface SetupState {
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
          onClick={ () => this.props.onDelete(movie) }
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}

class Setup extends React.Component<SetupProps, SetupState> {

  state: SetupState = { movie: "" };

  handleTextChange: ((e: React.SyntheticEvent) => void) = (e: React.SyntheticEvent) => {
    const target: HTMLButtonElement = e.currentTarget as HTMLButtonElement;
    this.setState({ movie: target.value });
  };

  handleSubmit: ((e: React.SyntheticEvent) => void) = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.props.onAdd(this.state.movie.trim());
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
        onClick={ this.props.onStart }
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
