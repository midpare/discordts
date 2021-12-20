import { GuildMember, Interaction, Message, TextChannel } from "discord.js";

export interface ExtendInteraction extends Interaction {
  member: GuildMember
  customId: string
  channel: TextChannel
  reply: Message["reply"]
  values: string
}

type ExecuteType = (interaction: ExtendInteraction) => any

export interface interactionType {
  name: string
  execute: ExecuteType
}
