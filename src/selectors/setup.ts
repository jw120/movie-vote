import { IRootData } from "../rootData";

export interface ISetupPropData {
   queue: string[];
}

export function setupSelector(s: IRootData): { setup: ISetupPropData } {
  return {
    setup: {
      queue: s.queue
    }
  };
}
