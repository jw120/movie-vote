import { RootData } from "../rootData";

export interface SetupPropData {
   queue: string[];
}

export function setupSelector(s: RootData): { setup: SetupPropData } {
  return {
    setup: {
      queue: s.queue
    }
  };
}
