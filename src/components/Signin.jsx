import * as React from "react";

import type { TSigninState } from "../reducers/signin";

export default function Signin(props: TSigninState) {
  return <div className="signin">Signin! {props.hostName || "No host"}</div>;
}
