/* @flow */
var react_redux_1 = require("react-redux");
var MovieApp_1 = require("./MovieApp");
function stateToProps(s) {
    if (!s.mode) {
        throw new Error("Unknown mode in MovieAppContainer stateToProps");
    }
    return {
        mode: s.mode
    };
}
var MovieAppContainer = react_redux_1.connect(stateToProps)(MovieApp_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MovieAppContainer;
//# sourceMappingURL=MovieAppContainer.js.map