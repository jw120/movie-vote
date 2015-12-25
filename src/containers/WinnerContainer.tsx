import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import actionCreators, { join, startSetup } from "../actionCreators";
import { winnerSelector, WinnerPropData } from "../selectors/winner";

import Winner from "../components/Winner";

interface WinnerContainerProps {
  winner: WinnerPropData,
  dispatch: Dispatch
}

class WinnerContainer extends React.Component<WinnerContainerProps, {}> {
  render() {
    return (
      <Winner
        { ...this.props.winner }
        onJoin={ (name: string) => this.props.dispatch(join(name)) }
        onStartSetup={ (name: string) => this.props.dispatch(startSetup(name)) }
       />
    );
  }
}

export default connect(winnerSelector, actionCreators)(WinnerContainer) as any as () => React.Component<{}, {}>;
