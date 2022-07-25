import { ButtonInteraction, SelectMenuInteraction } from 'discord.js';
import { Client } from '../structures/Client';

type ExecuteType<T extends ButtonInteraction | SelectMenuInteraction> = (options: {
  interaction: T,
  options: any
  client: Client
}) => Promise<void>;

export class Interaction<T extends ButtonInteraction | SelectMenuInteraction> {
  public readonly name: string;
  public readonly private: boolean;
  public readonly execute: ExecuteType<T>;
  constructor(options: Interaction<T>) {
    this.name = options.name;
    this.private = options.private;
    this.execute = options.execute;
  }
}