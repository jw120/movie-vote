// Minimal "good-enough to compile" .d.ts file fro redux-devtools-dock`-monitor (v3.0.0)

declare module "redux-devtools-dock-monitor" {
  import { Component } from "react";
  interface IDockMonitorProps {
    defaultPosition?: string;
    defaultIsVisible?: boolean;
    defaultSize?: number;
    toggleVisibilityKey: string;
    changePositionKey: string;
    fluid?: boolean;
  }
  export default function DockMonitor(): Component<IDockMonitorProps, { }>;
}
