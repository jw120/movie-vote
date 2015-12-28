import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { IRootData } from "../rootData";
import actionCreators from "../actionCreators";
import { SIGNIN, VOTING, MONITOR, SETUP, WINNER } from "../stateTypes";

import Signin from "../components/Signin";
import Setup from "../components/Setup";
import Monitor from "../components/Monitor";
import Voting from "../components/Voting";
import Winner from "../components/Winner";

interface IInjectedProps extends IRootData {
   dispatch?: Dispatch;
}

class App extends React.Component<IInjectedProps, {}> {
  render(): JSX.Element {
    switch (this.props.mode) {
      case SIGNIN:
        return <Signin { ...this.props } />;
      case SETUP:
        return <Setup { ...this.props } />;
      case MONITOR:
        return <Monitor { ...this.props } />;
      case VOTING:
        return <Voting { ...this.props } />;
      case WINNER:
        return <Winner { ...this.props } />;
      default:
        return <div>Unknown mode</div>;
    }
  }
}

function allToProps(s: IRootData): IRootData {
  return s;
}

export default connect(allToProps, actionCreators)(App);
