import { Guild, GuildMember, Message, MessageMentions, TextChannel, Snowflake } from 'discord.js';

export interface ExtendMessage extends Message {
  channel: TextChannel;
  member: GuildMember;
  mentions: MessageMentions;
  guildId: Snowflake;
  guild: Guild;
}

interface ExecuteOptions {
  msg: ExtendMessage;
  args: Array<string>;
}

type ExecuteType = (options: ExecuteOptions) => any;

export interface CommandType {
  name: string;
  aliases?: Array<string>;
  category: string;
  usage: string;
  description: string;
  execute: ExecuteType;
}