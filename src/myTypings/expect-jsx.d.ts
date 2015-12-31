// Good-enough (for this project) declarations for algolia/expect-jsx

declare var exportJSX: any; // to be used with expect.extend()

declare module "expect-jsx" {
  export default exportJSX;
}
