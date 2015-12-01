// /* @flow */
//
// import {
//   HOST_START, HOST_QUEUE_ADD, HOST_QUEUE_DELETE, HOST_RESET, REMOTE_VOTE_RECEVIED
// } from "./ActionTypes";
//
// import { broadcastHostReady } from "./socket";
// import type { TAction } from "./actionCreators";
// import type { StateType } from "./reducer";
//
// /*
//  * Setup mode is ended by HOST_START
//  * State change is from entry changes
//  */
// export function setupReducer(state: StateType, action: TAction): StateType {
//   switch (action.type) {
//
//     case HOST_START:
//       if (state.queue && state.queue.length >= 2) {
//         broadcastHostReady(state.name);
//         return {
//           ...state,
//           mode: "MONITOR"
//         };
//       }
//       break;
//
//     case HOST_QUEUE_ADD:
//       if (typeof action.payload === "string") {
//         return {
//           ...state,
//           queue: state.queue ? state.queue.concat(action.payload) : [action.payload]
//         };
//       }
//       break;
//
//     case HOST_QUEUE_DELETE:
//       if (typeof action.payload === "string") {
//         return {
//           ...state,
//           queue: state.queue ? state.queue.filter(x => x !== action.payload) : state.queue
//         };
//       }
//       break;
//   }
//   return state;
// }
//
// export function monitorReducer(state: StateType, action: TAction): StateType {
//
//   return state;
// }
