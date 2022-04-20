import { Guild, GuildMember, Message, MessageMentions, TextChannel, Snowflake } from 'discord.js';

type ExecuteType = (options: {
  msg: Message;
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