import { IRootData } from "../rootData";

export interface ISetupPropData {
   queue: string[];
}

export function setupSelector(s: IRootData): ISetupPropData {
  return {
    queue: s.queue
  };
}
