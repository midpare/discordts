import { Client } from "../structures/Client";

type ExecuteType = (client: Client) => Promise<void>

export class Interval {
  public readonly immediate: boolean;
  public readonly interval: string;
  public readonly execute: ExecuteType;

  constructor(options: Interval) {
    this.immediate = options.immediate;
    this.interval = options.interval;
    this.execute = options.execute;
  }
}
