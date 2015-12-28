import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import actionCreators, { next } from "../actionCreators";
import { monitorSelector, IMonitorPropData } from "../selectors/monitor";

import Monitor from "../components/Monitor";

interface IMonitorContainerProps {
  monitor: IMonitorPropData;
  dispatch: Dispatch;
}

class MonitorContainer extends React.Component<IMonitorContainerProps, {}> {
  render(): JSX.Element {
    return (
      <Monitor
        { ...this.props.monitor }
        onNext={ () => this.props.dispatch(next()) }
       />
    );
  }
}

export default connect(monitorSelector, actionCreators)(MonitorContainer) as any as () => React.Component<{}, {}>;
