import * as React from "react";

import SigninContainer from "./SigninContainer";
import VotingContainer from "./VotingContainer";
import SetupContainer from "./SetupContainer";

export default function Root(props: TState) {

  switch (props.mode) {
    case "SIGNIN":
      return <SigninContainer />;
    case "VOTING":
      return <VotingContainer />;
    case "SETUP":
      return <SetupContainer />;
  }
  return <div>Unknown mode {props.mode}</div>;

}
