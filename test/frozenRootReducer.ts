// Wrapped version of rootReducer that freezes arguments
// Deepfreeze borrowed from https://github.com/substack/deep-freeze

import { RootData } from "../src/rootData";
import { IAction } from "../src/actionCreators";
import rootReducer from "../src/reducers/rootReducer";

function deepFreeze (o: any) {
  if (o === undefined) {
    return o;
  }
  Object.freeze(o);

  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (o.hasOwnProperty(prop)
    && o[prop] !== null
    && (typeof o[prop] === "object" || typeof o[prop] === "function")
    && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });

  return o;
};

// Version of rootReducer which freezes its arguments
export default function frozenRootReducer(s: RootData, a: IAction): RootData {
  deepFreeze(s);
  deepFreeze(a);
  return rootReducer(s, a);
}