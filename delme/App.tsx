// Container component for Start-up phase

import * as React from "react";
import { connect } from "react-redux";
import { StoreMethods } from "redux";

import actionCreators, { next } from "../actionCreators";
import { TMovieAppProps } from "../reducers/rootReducer";

import Monitor from "../components/Monitor";

class InjectedApp extends React.Component<StoreMethods, {}> {
  render() {
    const { dispatch, getState } = this.props; // Pull-in injected store methods
    switch (getState().mode) {
      case "SIGNIN":
        // return React.createElement(SigninContainer, this.props.signin);
      case "VOTING":
        // return React.createElement(VotingContainer, this.props.voting);
      case "SETUP":
        // return React.createElement(SetupContainer, this.props.setup);
      case "MONITOR":
        const m = getState().monitor;
        return (
          <Monitor
            name={ m.name }
            movieA={ m.movieA }
            movieB={ m.movieB }
            queue={ m.queue }
            scoreA={ m.scoreA }
            scoreB={ m.scoreB }
            onNextClick={ dispatch(next()) }
          />
        );
      case "WINNER":
        // return React.createElement(WinnerContainer, this.props.winner);
    }
    return <div>Unknown mode { getState().mode }</div>;
  }

}

function nothing() { };
interface PlainComponent extends React.Component<any, {}> {
  render: () => JSX.Element;
}
const App = connect(nothing, actionCreators)(InjectedApp) as any as () => PlainComponent;
export default App;
