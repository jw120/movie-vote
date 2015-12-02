import * as React from "react";

import type { TSigninState } from "../reducers/signin";

// export default function Signin(props: TSigninState) {
//   console.log("Signin", props);
//   return <div class="signin">Signin! {props.hostName || "No host"}</div>;
// }

var Signin = React.createClass({
  render: function () {
    return (
      <div className="signin">
        Signin! {(this.props && this.props.hostName) || "No host"}
      </div>
    )
  }
});

export default Signin;
