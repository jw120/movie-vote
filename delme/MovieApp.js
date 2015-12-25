/* @flow */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var SigninContainer_1 = require("./SigninContainer");
var VotingContainer_1 = require("./VotingContainer");
var SetupContainer_1 = require("./SetupContainer");
var MonitorContainer_1 = require("./MonitorContainer");
var WinnerContainer_1 = require("./WinnerContainer");
// export default function MovieApp(props: TMovieAppProps) {
var MovieApp = (function (_super) {
    __extends(MovieApp, _super);
    function MovieApp() {
        _super.apply(this, arguments);
    }
    MovieApp.prototype.render = function () {
        switch (this.props.mode) {
            case "SIGNIN":
                return React.createElement(SigninContainer_1.default, this.props.signin);
            case "VOTING":
                return React.createElement(VotingContainer_1.default, this.props.voting);
            case "SETUP":
                return React.createElement(SetupContainer_1.default, this.props.setup);
            case "MONITOR":
                return React.createElement(MonitorContainer_1.default, this.props.monitor);
            case "WINNER":
                return React.createElement(WinnerContainer_1.default, this.props.winner);
        }
        return React.createElement("div", null, "Unknown mode ", this.props.mode);
    };
    return MovieApp;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MovieApp;
// MovieApp.propTypes = MovieAppPropTypes;
//# sourceMappingURL=MovieApp.js.map