import { ExtendClient } from "../structures/Client";

type ExecuteType = (client: ExtendClient) => Promise<void>

export class Interval {
  public immediate: boolean;
  public interval: string;
  public execute: ExecuteType;

  constructor(options: Interval) {
    this.immediate = options.immediate;
    this.interval = options.interval;
    this.execute = options.execute;
  }
}
