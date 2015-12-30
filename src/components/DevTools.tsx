import * as React from "react";

import { createDevTools, ICreateDevTools } from "redux-devtools";
import LogMonitor from "redux-devtools-log-monitor";
import DockMonitor from "redux-devtools-dock-monitor";

/* tslint:disable:variable-name (tslint expects camelCase variable names) */
const DevTools: ICreateDevTools = createDevTools(
/* tslint:disable:variable-name */
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    defaultPosition="bottom"
  >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
);

export default DevTools;
