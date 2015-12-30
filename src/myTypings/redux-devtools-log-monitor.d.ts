// Minimal "good-enough to compile" .d.ts file fro redux-devtools-log-monitor (v1.0.1)

declare module "redux-devtools-log-monitor" {
  import { Component } from "react";
  interface ILogMonitorProps {
    theme?: string;
    select?: Function;
    preserveScrollTop?: boolean;
  }
  export default function LogMonitor(): Component<ILogMonitorProps, { }>;
}
