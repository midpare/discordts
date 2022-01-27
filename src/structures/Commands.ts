import { CommandType, ExtendMessage } from '../util/typings/command';

export class Command {
  public name: string;
  public aliases: Array<string> | null;
  public category: string;
  public usage: string;
  public description: string;
  public execute: (options: {
    msg: ExtendMessage;
    args: Array<string>;
  }) => any;
  constructor(commandOptions: CommandType) {
    this.name = commandOptions.name;
    this.aliases = commandOptions.aliases ? commandOptions.aliases : null;
    this.category = commandOptions.category;
    this.usage = commandOptions.usage;
    this.description = commandOptions.usage;
    this.execute = commandOptions.execute;
  }
}