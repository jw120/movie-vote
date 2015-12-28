import * as React from "react";

import { createDevTools, CreateDevTools } from "redux-devtools";
import LogMonitor from "redux-devtools-log-monitor";
import DockMonitor from "redux-devtools-dock-monitor";

const DevTools: CreateDevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    defaultPosition="bottom"
  >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
);

export default DevTools;
