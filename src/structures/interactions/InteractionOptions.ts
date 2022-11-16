import { Message, MessageComponentInteraction, MessageEditOptions, Snowflake } from 'discord.js';

interface InteractionOptionType<T> {
  ids: Snowflake[];
  guildId: Snowflake;
  cmd: string;
  customIds: string[];
  messages: Array<Message>;
  data: T;
}

export class InteractionOption<T> {
  public ids: Snowflake[];
  public guildId: Snowflake;
  public cmd: string;
  public customIds: string[];
  public messages: Array<Message>;
  public data: T;

  constructor(option: InteractionOptionType<T>) {
    this.ids = option.ids;
    this.guildId = option.guildId;
    this.cmd = option.cmd;
    this.customIds = option.customIds;
    this.messages = option.messages;
    this.data = option.data;
  }

  public send(interaction: MessageComponentInteraction, options: MessageEditOptions) {
    interaction.deferUpdate();
    this.messages[0].edit(options);
  }
}