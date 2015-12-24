/* @flow */

import * as React from "react";
import { Provider } from "react-redux";
import MovieAppContainer from "./MovieAppContainer";
import DevTools from "./DevTools";
import storeShape from "react-redux/lib/utils/storeShape";

export type TStore = {
  subscribe: Function,
  dispath: Function,
  getState: Function
};

export default function Root(props: { store: TStore }) {
  return (
    <Provider store={ props.store }>
      <div>
        <MovieAppContainer />
        <DevTools />
      </div>
    </Provider>
  );
}

Root.propTypes = {
  store: storeShape
};
