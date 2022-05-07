import { Interaction } from 'discord.js';
import { ExtendClient } from '../structures/Client';

type ExecuteType = (options: {
  interaction: Interaction, 
  client: ExtendClient
}) => Promise<void>;

export class ExtendInteraction {
  public name: string;
  public execute: ExecuteType;
  constructor(options: ExtendInteraction) {
    this.name = options.name;
    this.execute = options.execute;
  }
}
