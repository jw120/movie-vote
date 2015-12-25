/* @flow */
/* global process */

// if (process.env.NODE_ENV === "production") {
//   module.exports = require("./Root.prod");
// } else {
//   module.exports = require("./Root.dev");
// }

// if (process.env.NODE_ENV === "production") {
//   import { Root } from "./Root.prod";
// } else {
  import Root from "./Root.dev";
// }
export default Root;
