import { GuildMember, Interaction, Message, TextChannel } from "discord.js";

export interface extendInteraction extends Interaction {
  member: GuildMember
  customId: string
  channel: TextChannel
  reply: Message["reply"]
  values: string
}

type executeType = (interaction: extendInteraction) => any

export interface interactionType {
  name: string
  execute: executeType
}
