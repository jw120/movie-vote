/* @flow */
var react_redux_1 = require("react-redux");
var actionCreators_1 = require("../actionCreators");
var setup_1 = require("../reducers/setup");
var Setup_1 = require("./Setup");
var SetupContainer = react_redux_1.connect(setup_1.unwrapSetup, actionCreators_1.default)(Setup_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SetupContainer;
//# sourceMappingURL=SetupContainer.js.map