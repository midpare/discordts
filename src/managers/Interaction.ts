import { ButtonInteraction, SelectMenuInteraction } from 'discord.js';
import { Client } from '../structures/Client';
import { InteractionOptions } from '../structures/InteractionOptions';

type ExecuteType<T extends ButtonInteraction | SelectMenuInteraction> = (options: {
  interaction: T,
  options: InteractionOptions | undefined
  client: Client
}) => Promise<void>;

export class Interaction<T extends ButtonInteraction | SelectMenuInteraction> {
  public readonly name: string;
  public readonly deleted: boolean;
  public readonly execute: ExecuteType<T>;
  constructor(options: Interaction<T>) {
    this.name = options.name;
    this.deleted = options.deleted;
    this.execute = options.execute;
  }
} 