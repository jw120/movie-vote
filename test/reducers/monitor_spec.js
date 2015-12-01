/* eslint-env mocha */

import { expect } from "chai";

import actionCreators from "../../src/actionCreators";
import reducer from "../../src/reducers/reducer";

import { mkWinner } from "../../src/reducers/winner";
import { mkMonitor } from "../../src/reducers/monitor";

describe("monitor reducer", () => {

  // Next with 2 in queue and non-equal score
  // Next with 1 in queue and non-equal score
  // Next with 0 in queue and non-equal score
  // Next with 2 in queue and equal score
  // Next with 1 in queue and equal score
  // Next with 0 in queue and equal score

  // remoteVoteReceived with valid vote
  // ... with vote not in pair, vote not in queue either, null, undefined, empty

  // it("HOST_START triggers monitor mode with 3 in queue", () => {
  //   const s = mkSetup("bob", ["a", "b", "c"]);
  //   const a = actionCreators.hostStart();
  //   const x = mkMonitor("bob", "a", "b", ["c"], 0, 0);
  //   expect(reducer(s, a)).to.deep.equal(x);
  // });

});
