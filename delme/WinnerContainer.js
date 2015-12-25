/* @flow */
var react_redux_1 = require("react-redux");
var actionCreators_1 = require("../actionCreators");
var winner_1 = require("../reducers/winner");
var Winner_1 = require("./Winner");
var WinnerContainer = react_redux_1.connect(winner_1.unwrapWinner, actionCreators_1.default)(Winner_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WinnerContainer;
//# sourceMappingURL=WinnerContainer.js.map