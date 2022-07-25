import { ButtonInteraction, SelectMenuInteraction } from 'discord.js';
import { ExtendClient } from '../structures/Client';

type ExecuteType<T extends ButtonInteraction | SelectMenuInteraction> = (options: {
  interaction: T,
  options: any
  client: ExtendClient
}) => Promise<void>;

export class InteractionCommand<T extends ButtonInteraction | SelectMenuInteraction> {
  public name: string;
  public private: boolean;
  public execute: ExecuteType<T>;
  constructor(options: InteractionCommand<T>) {
    this.name = options.name;
    this.private = options.private;
    this.execute = options.execute;
  }
}