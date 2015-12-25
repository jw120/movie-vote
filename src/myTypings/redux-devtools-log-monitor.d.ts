// Minimal "good-enough to compile" .d.ts file fro redux-devtools-log-monitor (v1.0.1)

declare module "redux-devtools-log-monitor" {
  import { Component } from "react";
  export default function LogMonitor(): Component<any, any>;
}
