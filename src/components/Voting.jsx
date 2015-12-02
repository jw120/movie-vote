import * as React from "react";

import { Button } from "react-bootstrap";

// import type { TSigninState } from "../reducers/signin";

// export default function Signin(props: TSigninState) {
//   return <div className="signin">Signin! {props.hostName || "No host"}</div>;
// }

const Voting = React.createClass({
  render() {
    return (
      <div className="voting">
        <div className="voting-label">
          { this.props.hostName }'s vote ({ this.props.name })
        </div>
        <Button bsSize="large" bsStyle="primary" block>{ this.props.movieA }</Button>
        <Button bsSize="large" bsStyle="primary" block>{ this.props.movieB }</Button>
      </div>
    );
  }
});


export default Voting;
