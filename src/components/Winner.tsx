import * as React from "react";

import { IRootData } from "../rootData";
import Entry from "./Entry";

export interface IWinnerPropData {
  hostName?: string;
  movieA?: string;
  movieB?: string;
  winner: string;
}

// Select data we use from the main redux store
export function winnerSelector(s: IRootData): IWinnerPropData {
  return {
    hostName: s.hostName,
    movieA: s.movieA,
    movieB: s.movieB,
    winner: s.winner
  };
}

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
