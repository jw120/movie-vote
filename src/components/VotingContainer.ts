/* @flow */

import { connect } from "react-redux";

import actionCreators from "../actionCreators";
import { unwrapVoting } from "../reducers/voting";

import Voting from "./Voting";

const VotingContainer = connect(unwrapVoting, actionCreators)(Voting);

export default VotingContainer;
