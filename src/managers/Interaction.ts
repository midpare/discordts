import { ButtonInteraction, ModalSubmitInteraction, StringSelectMenuInteraction } from 'discord.js';
import { MidpareClient } from '../structures/Client.js';
import { InteractionOption } from '../structures/interactions/InteractionOptions.js';

type ExecuteType<T extends ButtonInteraction | ModalSubmitInteraction | StringSelectMenuInteraction, O> = (options: {
  interaction: T,
  options: InteractionOption<O>;
  client: MidpareClient
}) => Promise<void>;

export class Interaction<T extends ButtonInteraction | ModalSubmitInteraction | StringSelectMenuInteraction, O> {
  public readonly name: string;
  public readonly execute: ExecuteType<T, O>;
  constructor(options: Interaction<T, O>) {
    this.name = options.name;
    this.execute = options.execute;
  }
} 