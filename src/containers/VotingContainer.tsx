import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import actionCreators, { vote } from "../actionCreators";
import { votingSelector, VotingPropData } from "../selectors/voting";

import Voting from "../components/Voting";

interface VotingContainerProps {
  voting: VotingPropData;
  dispatch: Dispatch;
}

class VotingContainer extends React.Component<VotingContainerProps, {}> {
  render(): JSX.Element {
    return (
      <Voting
        { ...this.props.voting }
        onVote={ (movie: string) => this.props.dispatch(vote(movie)) }
       />
    );
  }
}

export default connect(votingSelector, actionCreators)(VotingContainer) as any as () => React.Component<{}, {}>;
