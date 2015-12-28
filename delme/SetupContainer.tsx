import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import actionCreators, { hostQueueAdd, hostQueueDelete, hostStart } from "../actionCreators";
import { setupSelector, ISetupPropData } from "../selectors/setup";

import Setup from "../components/Setup";

interface ISetupContainerProps {
  setup: ISetupPropData;
  dispatch: Dispatch;
}

class SetupContainer extends React.Component<ISetupContainerProps, {}> {
  render(): JSX.Element {
    return (
      <Setup
        { ...this.props.setup }
        onAdd={ (movie: string) => this.props.dispatch(hostQueueAdd(movie)) }
        onDelete={ (movie: string) => this.props.dispatch(hostQueueDelete(movie)) }
        onStart= { () => this.props.dispatch(hostStart())}
       />
    );
  }
}

export default connect(setupSelector, actionCreators)(SetupContainer) as any as () => React.Component<{}, {}>;
