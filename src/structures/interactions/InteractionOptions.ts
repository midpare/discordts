import { Message, Snowflake } from 'discord.js';

export class InteractionOption<T> {
  public ids: Snowflake[];
  public guildId: Snowflake;
  public cmd: string;
  public customIds: string[];
  public message: Message;
  public data: T;

  constructor(option: InteractionOption<T>) {
    this.ids = option.ids;
    this.guildId = option.guildId;
    this.cmd = option.cmd;
    this.customIds = option.customIds;
    this.message = option.message;
    this.data = option.data;
  }
}