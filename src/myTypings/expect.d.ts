// Good-enough (for this project) declarations for mjackson/expect
// Includes definitions for algolia/expect-jsx

// import { Component } from "react"; // for expect-jsx declarations

// declare function expect(target?: any): Expect.Expectation;
declare var expect: Expect.ExpectStatic;

declare module Expect {

  interface ExpectStatic {
    (o: any): Expectation;
    createSpy: any;
    spyOn: any;
    isSpy: any;
    restoreSpies: any;
    assert: any;
    extend: any;
  }

  class Expectation {
    constructor(o: any);
    toExist(message?: string): Expectation; // truthy
    toNotExist(message?: string): Expectation;
    toBe(value: any, message?: string): Expectation; // ===
    toNotBe(value: any, message?: string): Expectation;
    toEqual(value: any, message?: string): Expectation; // isEqual (tests for deep equality)
    toNotEqual(value: any, message?: string): Expectation;
    toThrow(value: any, message?: string): Expectation; // throws
    toNotThrow(value: any, message?: string): Expectation;
    toBeA(value: string, message?: string): Expectation; // typeof ===
    toNotBeA(value: string, message? : string): Expectation;
    toMatch(pattern: RegExp, message?: string): Expectation; // regexp match
    toNotMatch(pattern: RegExp, message?: string): Expectation;
    toBeLessThan(value: number, message?: string): Expectation; // <
    toBeGreaterThan(value: number, message?: string): Expectation; // >
    toInclude(value: any, compareValues: any, message?: string): Expectation; // array or string contains
    toExclude(value: any, compareValues: any, message?: string): Expectation;
    toHaveBeenCalled(message?: string): Expectation; // spy
    toHaveBeenCalledWith(args: any[]): Expectation;
    toNotHaveBeenCalled(message?: string): Expectation;

    // withContext(context) - not yet implemented in this .d.ts
    // withArgs() - not yet implemented in this .d.ts

    toBeAn(value: string, message?: string): Expectation; // alias for toBeA
    toNotBeAn(value: string, message?: string): Expectation;
    toBeTruthy(message?: string): Expectation; // alias for toExist
    toBeFalsy(message?: string): Expectation;
    toBeFewerThan(value: number, message?: string): Expectation; // alias for tobeLessThan
    toBeMoreThan(value: number, message?: string): Expectation;
    toContain(value: any, compareValues: any, message?: string): Expectation; // alias for toInclude
    toNotContain(value: any, compareValues: any, message?: string): Expectation; // alias for toInclude

    // algolia/expect-jsx
    toEqualJSX(e: any /* Component<any, any> | JSX.Element */): Expectation;

  }

}

declare module "expect" {
  export = expect;
}
