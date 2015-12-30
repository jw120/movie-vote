// Minimal "good-enough to compile" .d.ts file fro redux-devtools (v3.0.0)

declare module "redux-devtools" {
  import { Component } from "react";
  interface ICreateDevTools {
    instrument(): Function,
    (): Component<any, any>
  }
  export function createDevTools(children: any): ICreateDevTools;
  export function persistState(sessionId: any, stateDeserializer?: Function, actionDeserializer?: Function): Function;
}
