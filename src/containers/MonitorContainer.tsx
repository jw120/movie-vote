import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import actionCreators, { next } from "../actionCreators";
import { monitorSelector, MonitorPropData } from "../selectors/monitor";

import Monitor from "../components/Monitor";

interface MonitorContainerProps {
  monitor: MonitorPropData,
  dispatch: Dispatch
}

class MonitorContainer extends React.Component<MonitorContainerProps, {}> {
  render() {
    return (
      <Monitor
        { ...this.props.monitor }
        onNext={ () => this.props.dispatch(next()) }
       />
    );
  }
}

export default connect(monitorSelector, actionCreators)(MonitorContainer) as any as () => React.Component<{}, {}>;
