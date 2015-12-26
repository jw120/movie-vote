import { IAction } from "../../src/actionCreators";
import { initSocketClient } from "../../src/socket";
let dispatchOutput: IAction = undefined;
let emitOutput: any[] = undefined;
const mockStore = {
  dispatch: (action: IAction) =>  {
    dispatchOutput = action;
  }
}
const mockIO = {
  emit: (...args: any[]) => {
    emitOutput = args;
  },
  on: () => { }
}
initSocketClient(mockStore, mockIO);
