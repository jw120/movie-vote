/* @flow */
var react_redux_1 = require("react-redux");
var actionCreators_1 = require("../actionCreators");
var voting_1 = require("../reducers/voting");
var Voting_1 = require("./Voting");
var VotingContainer = react_redux_1.connect(voting_1.unwrapVoting, actionCreators_1.default)(Voting_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VotingContainer;
//# sourceMappingURL=VotingContainer.js.map