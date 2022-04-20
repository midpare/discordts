import { Interaction } from 'discord.js';

type ExecuteType = (interaction: Interaction) => Promise<void>;

export interface InteractionType {
  name: string;
  execute: ExecuteType;
}
