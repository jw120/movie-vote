import * as React from "react";
import { connect } from "react-redux";

import { IRootData } from "../rootData";
import actionCreators, { IActionCreators } from "../actionCreators";
import { SIGNIN, VOTING, MONITOR, SETUP, WINNER } from "../stateTypes";

import Signin from "../components/Signin";
import Setup from "../components/Setup";
import Monitor from "../components/Monitor";
import Voting from "../components/Voting";
import Winner from "../components/Winner";

import { signinSelector, ISigninPropData } from "../selectors/signin";
import { setupSelector, ISetupPropData } from "../selectors/setup";
import { monitorSelector, IMonitorPropData } from "../selectors/monitor";
import { votingSelector, IVotingPropData } from "../selectors/voting";
import { winnerSelector, IWinnerPropData } from "../selectors/winner";

interface IAppProps {
  mode: string;
  signin: ISigninPropData;
  setup: ISetupPropData;
  monitor: IMonitorPropData;
  voting: IVotingPropData;
  winner: IWinnerPropData;
}

// The connect decorator injects our props and actions (as props)
class WrappedApp extends React.Component<IAppProps & IActionCreators, {}> {
  render(): JSX.Element {
    switch (this.props.mode) {
      case SIGNIN:
        return (
          <Signin
            { ...this.props.signin }
            onJoin={ this.props.join }
            onStartSetup= { this.props.startSetup }
          />
        );
      case SETUP:
        return (
          <Setup
            { ...this.props.setup }
            onAdd= { this.props.hostQueueAdd }
            onDelete = { this.props.hostQueueDelete }
            onStart = { this.props.hostStart }
          />
        );
      case MONITOR:
        return (
          <Monitor
            { ...this.props.monitor }
            onNext = { this.props.next }
          />
        );
      case VOTING:
        return (
          <Voting
            { ...this.props.voting }
            onVote = { this.props.vote }
          />
        );
      case WINNER:
        return (
          <Winner
            { ...this.props.winner }
            onJoin={ this.props.join }
            onStartSetup= { this.props.startSetup }
          />
        );
      default:
        return <div>Unknown mode</div>;
    }
  }
}

function allToProps(s: IRootData): IAppProps {
  return {
    mode: s.mode,
    signin: signinSelector(s),
    setup: setupSelector(s),
    monitor: monitorSelector(s),
    voting: votingSelector(s),
    winner: winnerSelector(s)
  };
}

// We export the decorated version of the container, over-riding the props as
// they are injected by the connect decorator and not supplied when App is called
export default connect(allToProps, actionCreators)(WrappedApp as React.ComponentClass<{ }>);
