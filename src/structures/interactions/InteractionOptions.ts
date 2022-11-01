import { Message, Snowflake } from 'discord.js';

export class InteractionOption {
  public ids: Snowflake[];
  public guildId: Snowflake
  public cmd: string
  public customIds: string[];
  public messages: Array<Message>;
  public data?: any;

  constructor(option: InteractionOption) {
    this.ids = option.ids;
    this.guildId = option.guildId;
    this.cmd = option.cmd;
    this.customIds = option.customIds;
    this.messages = option.messages;
    this.data = option.data;
  }
}