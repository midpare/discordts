import Discord, { ButtonInteraction, ClientOptions, Collection, GuildMember, ModalSubmitInteraction, StringSelectMenuInteraction, Snowflake } from 'discord.js'
import { Betting } from './games/Betting';
import { Interaction } from '../managers/Interaction';
import { CivilWar } from './games/CivilWar';
import { Messages } from '../language/message';
import { InteractionOption } from './interactions/InteractionOptions';
import { Gomoku } from './interactions/gomoku';
import { Command } from '../managers/Command';
import mongoose from 'mongoose';
import { Music } from './interactions/music';

export class Client extends Discord.Client {
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