import { ButtonInteraction, ModalSubmitInteraction, SelectMenuInteraction } from 'discord.js';
import { Client } from '../structures/Client';
import { InteractionOption } from '../structures/interactions/InteractionOptions';

type ExecuteType<T extends ButtonInteraction | SelectMenuInteraction | ModalSubmitInteraction> = (options: {
  interaction: T,
  options: InteractionOption | undefined
  client: Client
}) => Promise<void>;

export class Interaction<T extends ButtonInteraction | SelectMenuInteraction | ModalSubmitInteraction> {
  public readonly name: string;
  public readonly deleted: boolean;
  public readonly execute: ExecuteType<T>;
  constructor(options: Interaction<T>) {
    this.name = options.name;
    this.deleted = options.deleted;
    this.execute = options.execute;
  }
} 