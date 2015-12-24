// Minimal "good-enough to compile" .d.ts file fro redux-devtools (v3.0.0)

declare module "redux-devtools" {
  import { Component } from "react";
  interface DevToolsClass extends Component<any, any> {
    instrument(): Function;
  }
  export function createDevTools(children: any): DevToolsClass;
  export function persistState(sessionId: any, stateDeserializer?: Function, actionDeserializer?: Function): Function;
  // export function instrument(): Function;
  // export function ActionCreators(): Function;
  // export function ActionTypes(): Function;
}
