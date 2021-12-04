import { Guild, GuildMember, Message, MessageMentions, TextChannel, Snowflake } from "discord.js"

export interface extendMessage extends Message{
  channel: TextChannel
  member: GuildMember
  mentions: MessageMentions
  guildId: Snowflake
  guild: Guild
  members: GuildMember
}

interface executeOptions {
  msg: extendMessage
  args: Array<string>
}

type executeType = (options: executeOptions) => any

export interface commandType {
  name: string
  aliases: Array<string>
  category: string
  execute: executeType
}