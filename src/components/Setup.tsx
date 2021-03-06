import * as React from "react";
import { Button, ButtonInput, Input, Table } from "react-bootstrap";

import { IRootData } from "../rootData";

interface ISetupPropData {
   queue: string[];
}

// Select data we use from the main redux store
export function setupSelector(s: IRootData): ISetupPropData {
  return {
    queue: s.queue
  };
}

interface ISetupProps extends ISetupPropData {
   onDelete: (movie: string) => void;
   onAdd: (movie: string) => void;
   onStart: () => void;
}

// Used by our Input
interface ISetupState {
  movie: string;
};

const renderRow: ((onDelete: Function) => (movie: string) => JSX.Element) =
  (onDelete: Function)  => (movie: string): JSX.Element => {
  return (
    <tr key={ movie }>
      <td>{ movie }</td>
      <td>
        <Button
          bsSize="xsmall"
          bsStyle="link"
          onClick={ () => onDelete(movie) }
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

class Setup extends React.Component<ISetupProps, ISetupState> {

  state: ISetupState = { movie: "" };

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
          { this.props.queue.map(renderRow(this.props.onDelete)) }
        </tbody>
      </Table>
    );
  }

  renderStartButton(): JSX.Element {
    return (
      <Button
        bsSize="large"
        bsStyle="primary"
        block
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
