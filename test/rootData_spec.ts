import * as expect from "expect";

import { addToRootData, IRootData } from "../src/rootData";
import { deepFreeze } from "./frozenRootReducer";

describe("addToRootData", () => {

  it("Adds properties to empty object", () => {
    let start: IRootData = { };
    let add: IRootData = { name: "n", scoreA: 22 };
    deepFreeze(start);
    deepFreeze(add);
    expect(addToRootData(start, add)).toEqual(add);
  });

  it("Adds properties to non-empty object", () => {
    let start: IRootData = { scoreB: 11 };
    let add: IRootData = { name: "n", scoreA: 22 };
    let end: IRootData = { name: "n", scoreA: 22, scoreB: 11 };
    deepFreeze(start);
    deepFreeze(add);
    expect(addToRootData(start, add)).toEqual(end);
  });

  it("Overwrites properties of non-empty object", () => {
    let start: IRootData = { scoreB: 11, name: "Q" };
    let add: IRootData = { name: "n", scoreA: 22 };
    let end: IRootData = { name: "n", scoreA: 22, scoreB: 11 };
    deepFreeze(start);
    deepFreeze(add);
    expect(addToRootData(start, add)).toEqual(end);
  });

  it("Ignores prototype properties in source", () => {
    let start: IRootData = { scoreB: 11, name: "Q" };
    (start as any).__proto__ = { protoProp: 33 }
    let add: IRootData = { hostname: "n", scoreA: 22 };
    let end: IRootData = { name: "Q", hostname: "n", scoreA: 22, scoreB: 11 };
    deepFreeze(start);
    deepFreeze(add);
    expect(addToRootData(start, add)).toEqual(end);
  });

  it("Ignores prototype properties in template", () => {
    let start: IRootData = { scoreB: 11, name: "Q" };
    let add: IRootData = { hostname: "n", scoreA: 22 };
    (add as any).__proto__ = { protoProp: 44 }
    let end: IRootData = { name: "Q", hostname: "n", scoreA: 22, scoreB: 11 };
    deepFreeze(start);
    deepFreeze(add);
    expect(addToRootData(start, add)).toEqual(end);
  });

});
