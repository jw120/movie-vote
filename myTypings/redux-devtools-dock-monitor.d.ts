// Minimal "good-enough to compile" .d.ts file fro redux-devtools-dock`-monitor (v3.0.0)


declare module "redux-devtools-dock-monitor" {
  import { Component } from "react";
  export default function DockMonitor(): Component<any, any>;
}
