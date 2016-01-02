import * as React from "react";

import Entry from "./Entry";

import { IWinnerPropData } from "../selectors/winner";
interface IWinnerProps extends IWinnerPropData {
  onJoin: (name: string) => void;
  onStartSetup: (name: string) => void;
}

export default class Winner extends React.Component<IWinnerProps, {}> {
  render(): JSX.Element {
    return (
      <div className="winner">
        <div className="winner-announce">
          The winner is { this.props.winner }
        </div>
        <Entry
          hostName={ this.props.movieA && this.props.movieB && this.props.hostName }
          onJoin={ this.props.onJoin }
          onStartSetup={ this.props.onStartSetup }
        />
      </div>
    );
  }
}
