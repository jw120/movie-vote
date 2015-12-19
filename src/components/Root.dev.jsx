/* @flow */

import React, { Component } from "react";
import { Provider } from "react-redux";
import MovieAppContainer from "./MovieAppContainer";
import DevTools from "./DevTools";
import storeShape from "react-redux/lib/utils/storeShape";

export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={ store }>
        <div>
          <MovieAppContainer />
          <DevTools />
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: storeShape
};
