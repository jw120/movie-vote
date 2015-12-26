// mock versions of socket.io-client

import { IAction } from "../../src/actionCreators";
import { initSocketClient } from "../../src/socket";

interface IMock {
  io: {
    emit: (args: any[]) => void;
    on: () => void;
  };
  emitted: any[];
  store: {
    dispatch: (action: IAction) => void;
  };
  dispatched: IAction[];
  reset: () => void;
}

let mock: IMock = {
  io: {
    emit: (...args: any[]) => {
      mock.emitted.push(args);
    },
    on: () => { }
  },
  emitted: [],
  store: {
    dispatch: (action: IAction) =>  {
      mock.dispatched.push(action);
    }
  },
  dispatched: [],
  reset: () => {
    mock.emitted = [];
    mock.dispatched = [];
  }
}

export default mock;

// initSocketClient(mockStore, mockIO);
