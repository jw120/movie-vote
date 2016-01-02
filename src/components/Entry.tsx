// Join and Host buttons used by Singin and Winner

import * as React from "react";

import { Button } from "react-bootstrap";

interface IEntryProps {
  hostName?: string;
  onJoin: (name: string) => void;
  onStartSetup: (name: string) => void;
}

class Entry extends React.Component<IEntryProps, { }> {

  renderActiveJoinButton(): JSX.Element {
    return (
      <Button
        bsSize="large"
        bsStyle="primary"
        block={ true }
        onClick={ this.props.onJoin }
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
        onClick={ this.props.onStartSetup }
      >
      Host a new vote
      </Button>
    );
  }

  render(): JSX.Element {
    return (
      <div className="entry">
        { this.props.hostName ? this.renderActiveJoinButton() : this.renderInactiveJoinButton() }
        { this.renderHostButton() }
      </div>
    );
  }

}

export default Entry;
