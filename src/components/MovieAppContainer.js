/* @flow */

import { connect } from "react-redux";

import type { TMovieAppProps } from "../reducers/rootReducer";

import MovieApp from "./MovieApp";

type TTagOnly = {
  mode: string
};

function stateToProps(s: TMovieAppProps): TTagOnly {
  if (!s.mode) {
    throw new Error("Unknown mode in MovieAppContainer stateToProps");
  }
  return {
    mode: s.mode
  };
}

const MovieAppContainer = connect(stateToProps)(MovieApp);

export default MovieAppContainer;
