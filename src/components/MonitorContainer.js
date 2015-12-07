import { connect } from "react-redux";

import actionCreators from "../actionCreators";
import { unwrapMonitor } from "../reducers/monitor";

import Monitor from "./Monitor";

const MonitorContainer = connect(unwrapMonitor, actionCreators)(Monitor);

export default MonitorContainer;
