import { Message } from 'discord.js';
import { Client } from '../structures/Client';

type ExecuteType = (options: {
  msg: Message;
  args: Array<string>;
  client: Client;
}) => Promise<void>;

export class Command {
  public readonly name: string;
  public readonly aliases?: Array<string> | null;
  public readonly category?: string;
  public readonly usage?: string;
  public readonly description?: string;
  public readonly private?: boolean
  public readonly execute: ExecuteType;

  constructor(options: Command) {
    Object.assign(this, options);
    this.name = options.name;
    this.execute = options.execute;
  }
}
