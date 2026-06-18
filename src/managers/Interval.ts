import { MidpareClient } from '../structures/Client.js';

type ExecuteType = (client: MidpareClient) => Promise<void>

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
