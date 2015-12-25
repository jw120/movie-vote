/* @flow */
var react_redux_1 = require("react-redux");
var actionCreators_1 = require("../actionCreators");
var monitor_1 = require("../reducers/monitor");
var Monitor_1 = require("./Monitor");
var MonitorContainer = react_redux_1.connect(monitor_1.unwrapMonitor, actionCreators_1.default)(Monitor_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MonitorContainer;
//# sourceMappingURL=MonitorContainer.js.map