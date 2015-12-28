import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import actionCreators, { hostQueueAdd, hostQueueDelete, hostStart } from "../actionCreators";
import { setupSelector, SetupPropData } from "../selectors/setup";

import Setup from "../components/Setup";

interface SetupContainerProps {
  setup: SetupPropData;
  dispatch: Dispatch;
}

class SetupContainer extends React.Component<SetupContainerProps, {}> {
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
