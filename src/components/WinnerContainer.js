import { connect } from "react-redux";

import actionCreators from "../actionCreators";
import { unwrapWinner } from "../reducers/winner";

import Winner from "./Winner";

const WinnerContainer = connect(unwrapWinner, actionCreators)(Winner);

export default WinnerContainer;
