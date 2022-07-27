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
    this.name = options.name;
    this.aliases = options.aliases ?? null;
    this.category = options.category;
    this.usage = options.usage;
    this.description = options.description;
    this.private = options.private;
    this.execute = options.execute;
  }
}
