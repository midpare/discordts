import { Message } from 'discord.js';
import { ExtendClient } from '../structures/Client';

type ExecuteType = (options: {
  msg: Message;
  args: Array<string>;
  client: ExtendClient;
}) => any;

export class Command {
  public name: string;
  public aliases?: Array<string> | null;
  public category: string;
  public usage: string;
  public description: string;
  public execute: ExecuteType;

  constructor(options: Command) {
    this.name = options.name;
    this.aliases = options.aliases ?? null;
    this.category = options.category;
    this.usage = options.usage;
    this.description = options.description;
    this.execute = options.execute;
  }
}
