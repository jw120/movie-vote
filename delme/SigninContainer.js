/* @flow */
var react_redux_1 = require("react-redux");
var actionCreators_1 = require("../actionCreators");
var signin_1 = require("../reducers/signin");
var Signin_1 = require("./Signin");
var SigninContainer = react_redux_1.connect(signin_1.unwrapSignin, actionCreators_1.default)(Signin_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SigninContainer;
//# sourceMappingURL=SigninContainer.js.map