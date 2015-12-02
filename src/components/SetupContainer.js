import { connect } from "react-redux";

import actionCreators from "../actionCreators";
import { unwrapSetup } from "../reducers/setup";

import Setup from "./Setup";

const SetupContainer = connect(unwrapSetup, actionCreators)(Setup);

export default SetupContainer;
