import { ButtonInteraction, ModalSubmitInteraction, StringSelectMenuInteraction } from 'discord.js';
import { Client } from '../structures/Client';
import { InteractionOption } from '../structures/interactions/InteractionOptions';

type ExecuteType<T extends ButtonInteraction | ModalSubmitInteraction | StringSelectMenuInteraction, O> = (options: {
  interaction: T,
  options: InteractionOption<O>;
  client: Client
}) => Promise<void>;

export class Interaction<T extends ButtonInteraction | ModalSubmitInteraction | StringSelectMenuInteraction, O> {
  public readonly name: string;
  public readonly execute: ExecuteType<T, O>;
  constructor(options: Interaction<T, O>) {
    this.name = options.name;
    this.execute = options.execute;
  }
} 