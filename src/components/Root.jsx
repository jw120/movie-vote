import * as React from "react";

import SigninContainer from "./SigninContainer";
import VotingContainer from "./VotingContainer";

export default function Root(props: TState) {

  switch (props.mode) {
    case "SIGNIN":
      return <SigninContainer />;
    case "VOTING":
      return <VotingContainer />;
  }
  return <div>Unknown mode {props.mode}</div>;

}
