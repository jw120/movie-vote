// Good-enough (for this project) declarations for mjackson/expect
// Includes definitions for algolia/expect-jsx


declare var expect: Expect.ExpectStatic;

declare module Expect {

  interface ExpectStatic {
    <T>(o: T): Expectation<T>;
    createSpy: (fn?: Function) => Spy
    spyOn: (targetObject: any, targetMethod: string) => Spy;
    isSpy: (o: any) => boolean;
    restoreSpies: () => void;
    assert: (condition: boolean, messageFormat: string) => void;
    extend: (extension: any) => void;
  }

  export interface Spy {
    (...args: any[]): any;
    calls: any[];
    andCall: (fn: Function) => Spy;
    andCallThrough: () => Spy;
    andThrow: (o: any) => Spy;
    andReturn: (o: any) => Spy;
    getLastCall: () => any;
    restore: () => Spy;
    destroy: () => Spy;
  }

  class Expectation<T> {
    constructor(o: T);
    toExist(message?: string): Expectation<T>; // truthy
    toNotExist(message?: string): Expectation<T>;
    toBe(value: T, message?: string): Expectation<T>; // ===
    toNotBe(value: T, message?: string): Expectation<T>;
    toEqual(value: T, message?: string): Expectation<T>; // isEqual (tests for deep equality)
    toNotEqual(value: T, message?: string): Expectation<T>;
    toThrow(value: any, message?: string): Expectation<T>; // throws
    toNotThrow(value: any, message?: string): Expectation<T>;
    toBeA(value: string, message?: string): Expectation<T>; // typeof ===
    toNotBeA(value: string, message? : string): Expectation<T>;
    toMatch(pattern: RegExp, message?: string): Expectation<T>; // regexp match
    toNotMatch(pattern: RegExp, message?: string): Expectation<T>;
    toBeLessThan(value: number, message?: string): Expectation<T>; // <
    toBeGreaterThan(value: number, message?: string): Expectation<T>; // >
    toInclude(value: any, compareValues: any, message?: string): Expectation<T>; // array or string contains
    toExclude(value: any, compareValues: any, message?: string): Expectation<T>;
    toHaveBeenCalled(message?: string): Expectation<T>; // spy
    toHaveBeenCalledWith(...args: any[]): Expectation<T>;
    toNotHaveBeenCalled(message?: string): Expectation<T>;

    withArgs(...args: any[]): Expectation<T>;
    withContext(...args: any[]): Expectation<T>;

    toBeAn(value: string, message?: string): Expectation<T>; // alias for toBeA
    toNotBeAn(value: string, message?: string): Expectation<T>;
    toBeTruthy(message?: string): Expectation<T>; // alias for toExist
    toBeFalsy(message?: string): Expectation<T>;
    toBeFewerThan(value: number, message?: string): Expectation<T>; // alias for tobeLessThan
    toBeMoreThan(value: number, message?: string): Expectation<T>;
    toContain(value: any, compareValues: any, message?: string): Expectation<T>; // alias for toInclude
    toNotContain(value: any, compareValues: any, message?: string): Expectation<T>; // alias for toInclude

    // algolia/expect-jsx
    toEqualJSX(e: any): Expectation<T>;
    toNotEqualJSX(e: any): Expectation<T>;
    toIncludeJSX(e: any): Expectation<T>;
    toNotIncludeJSX(e: any): Expectation<T>;

  }

}

declare module "expect" {
  export = expect;
}
