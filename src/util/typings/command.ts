import { Guild, GuildMember, Message, MessageMentions, TextChannel, Snowflake } from 'discord.js';

export interface ExtendMessage extends Message {
  channel: TextChannel;
  member: GuildMember;
  mentions: MessageMentions;
  guildId: Snowflake;
  guild: Guild;
}

type ExecuteType = (options: {
  msg: ExtendMessage;
  args: Array<string>;
}) => any;

export interface CommandType {
  name: string;
  aliases?: Array<string>;
  category: string;
  usage: string;
  description: string;
  stopping?: boolean;
  execute: ExecuteType;
}