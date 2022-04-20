import { Message } from 'discord.js';
import { CommandType } from '../util/types/command';

export class Command {
  public name: string;
  public aliases: Array<string> | null;
  public category: string;
  public usage: string;
  public description: string;
  public execute: (options: {
    msg: Message;
    args: Array<string>;
  }) => any;
  constructor(commandOptions: CommandType) {
    this.name = commandOptions.name;
    this.aliases = commandOptions.aliases ? commandOptions.aliases : null;
    this.category = commandOptions.category;
    this.usage = commandOptions.usage;
    this.description = commandOptions.description;
    this.execute = commandOptions.execute;
  }
}