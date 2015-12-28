// This interface not exported by react-addons-test-utils.d.ts

import * as React from "react";
export interface ShallowRenderer {
    getRenderOutput<E extends React.ReactElement<any>>(): E;
    getRenderOutput(): React.ReactElement<any>;
    render(element: React.ReactElement<any>, context?: any): void;
    unmount(): void;
}
