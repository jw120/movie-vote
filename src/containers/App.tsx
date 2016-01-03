import * as React from "react";
import { connect } from "react-redux";

import { IRootData } from "../rootData";
import actionCreators, { IActionCreators } from "../actionCreators";
import { SIGNIN, VOTING, MONITOR, SETUP, WINNER } from "../stateTypes";

import Signin, { signinSelector } from "../components/Signin";
import Setup, { setupSelector } from "../components/Setup";
import Monitor, { monitorSelector } from "../components/Monitor";
import Voting, { votingSelector } from "../components/Voting";
import Winner, { winnerSelector } from "../components/Winner";

// The connect decorator injects our props and actions (as props)
class WrappedApp extends React.Component<IRootData & IActionCreators, {}> {
  render(): JSX.Element {
    switch (this.props.mode) {
      case SIGNIN:
        return (
          <Signin
            { ...signinSelector(this.props) }
            onJoin={ this.props.join }
            onStartSetup= { this.props.startSetup }
          />
        );
      case SETUP:
        return (
          <Setup
            { ...setupSelector(this.props) }
            onAdd= { this.props.hostQueueAdd }
            onDelete = { this.props.hostQueueDelete }
            onStart = { this.props.hostStart }
          />
        );
      case MONITOR:
        return (
          <Monitor
            { ...monitorSelector(this.props) }
            onNext = { this.props.next }
          />
        );
      case VOTING:
        return (
          <Voting
            { ...votingSelector(this.props) }
            onVote = { this.props.vote }
          />
        );
      case WINNER:
        return (
          <Winner
            { ...winnerSelector(this.props) }
            onJoin={ this.props.join }
            onStartSetup= { this.props.startSetup }
          />
        );
      default:
        return <div>Unknown mode</div>;
    }
  }
}

// We export the decorated version of the container, over-riding the props as
// they are injected by the connect decorator and not supplied when App is called
export default connect((s: IRootData) => s, actionCreators)(WrappedApp as React.ComponentClass<{ }>);
