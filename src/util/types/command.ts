import { Guild, GuildMember, Message, MessageMentions, TextChannel, Snowflake } from 'discord.js';
import { ExtendClient } from '../../structures/Client';

type ExecuteType = (options: {
  msg: Message;
  args: Array<string>;
  client: ExtendClient;
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