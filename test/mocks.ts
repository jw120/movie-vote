// Mock versions of socket.io-client

import { IAction } from "../src/actionCreators";

interface IMock {
  io: {
    emit: (args: any[]) => void; // Mock emit - output added to .emitted
    on: (keyword: string, callback: Function) => void; // Mock of callback setup
    test: (first: any, ...rest: any[]) => void;  // Triggers callbacks
  };
  store: {
    dispatch: (action: IAction) => void;
  };
  emitted: any[];
  dispatched: IAction[];
  reset: () => void; // Resets emitted and dispatched (not onList)
  onList: [string, Function][];
}

let mock: IMock = {
  io: {
    emit: (...args: any[]): void => {
      mock.emitted.push(args);
    },
    on: (keyword: string, callback: Function): void => {
      mock.onList.unshift([keyword, callback]);
    },
    test: (first: any, ...rest: any[]): void => {
      for (let [k, cb] of mock.onList) {
        if (first === k) {
          cb(...rest);
          break;
        }
      }
    }
  },
  emitted: [],
  store: {
    dispatch: (action: IAction): void =>  {
      mock.dispatched.push(action);
    }
  },
  dispatched: [],
  reset: (): void => {
    mock.emitted = [];
    mock.dispatched = [];
  },
  onList: []
};

export default mock;
