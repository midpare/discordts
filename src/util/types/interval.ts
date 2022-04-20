import { ExtendClient } from "../../structures/Client";

export interface IntervalType {
  execute: (client: ExtendClient) => Promise<void>;
  interval: string;
  immediate: boolean;
}