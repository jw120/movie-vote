/* @flow */

import React, { Component } from "react";
import { Provider } from "react-redux";
import MovieAppContainer from "./MovieAppContainer";
import storeShape from "react-redux/lib/utils/storeShape";

export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={ store }>
        <MovieAppContainer />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: storeShape
};
