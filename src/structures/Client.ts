import mongoose from 'mongoose';
import { ButtonInteraction, Client, ClientOptions, Collection, GuildMember, ModalSubmitInteraction, StringSelectMenuInteraction, Snowflake } from 'discord.js'
import { Betting } from './games/Betting.js';
import { Interaction } from '../managers/Interaction.js';
import { CivilWar } from './games/CivilWar.js';
import { Messages } from '../language/message.js';
import { InteractionOption } from './interactions/InteractionOptions.js';
import { Gomoku } from './interactions/gomoku.js';
import { Command } from '../managers/Command.js';
import { Music } from './interactions/music.js';

export class MidpareClient extends Client {
  public readonly commands: Collection<string, Command>;
  public readonly interactions: Collection<string, Interaction<ButtonInteraction | ModalSubmitInteraction | StringSelectMenuInteraction, unknown>>;
  public readonly interactionOptions: Collection<string, InteractionOption<any>>;
  public readonly coin: Collection<string, string>;
  public readonly betting: Collection<Snowflake, Betting>;
  public readonly gomoku: Collection<Snowflake, Gomoku>;
  public readonly alarmMembers: Collection<Snowflake, GuildMember>;
  public readonly music: Collection<Snowflake, Music>
  public readonly civilWar: CivilWar;
  public readonly messages: Messages;
  public readonly models: Record<string, mongoose.Model<any, {}, {}, {}, any>>;

  constructor(options: ClientOptions) {
    super(options);

    this.commands = new Collection();
    this.interactions = new Collection();
    this.interactionOptions = new Collection();
    this.coin = new Collection();
    this.betting = new Collection();
    this.gomoku = new Collection();
    this.alarmMembers = new Collection();
    this.music = new Collection();
    this.civilWar = new CivilWar();
    this.messages = new Messages();
    this.models = {};
  }
}