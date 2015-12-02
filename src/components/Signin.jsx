import * as React from "react";

import { Button, Input } from "react-bootstrap";

// import type { TSigninState } from "../reducers/signin";

// export default function Signin(props: TSigninState) {
//   return <div className="signin">Signin! {props.hostName || "No host"}</div>;
// }

const Signin = React.createClass({
  render() {
    return (
      <form className="signin">
        <h3 className="signin-heading">Welcome to Movie Vote</h3>
        <Input className="signin-input" type="text" placeholder="Enter your name" />
        <Button bsSize="large" bsStyle="primary" block>Join Eve's vote</Button>
        <Button bsSize="large" bsStyle="primary" block>Host a new vote</Button>
      </form>
    );
  }

  // getInitialState: () => ({ value: "" }),
  // validationState() {
  //   return this.state.value.length > 0 ? "success" : "error";
  // },
  // handleChange() {
  //   this.setState({ value: this.refs.input.getValue() });
  // }
});


export default Signin;
