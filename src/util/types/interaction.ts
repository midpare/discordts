import { Interaction } from 'discord.js';
import { ExtendClient } from '../../structures/Client';

type ExecuteType = (options: {
  interaction: Interaction, 
  client: ExtendClient
}) => Promise<void>;

export interface InteractionType {
  name: string;
  execute: ExecuteType;
}
