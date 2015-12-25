/* @flow */
var React = require("react");
var react_redux_1 = require("react-redux");
var MovieAppContainer_1 = require("./MovieAppContainer");
var DevTools_1 = require("./DevTools");
// import storeShape from "react-redux/lib/utils/storeShape";
// export type TStore = {
//   subscribe: Function,
//   dispath: Function,
//   getState: Function
// };
function Root(props) {
    return (React.createElement(react_redux_1.Provider, {"store": props.store}, React.createElement("div", null, React.createElement(MovieAppContainer_1.default, null), React.createElement(DevTools_1.default, null))));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Root;
// Root.propTypes = {
//   store: storeShape
// };
//# sourceMappingURL=Root.dev.js.map