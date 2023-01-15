import Discord, { ButtonInteraction, ClientOptions, Collection, GuildMember, Message, ModalSubmitInteraction, StringSelectMenuInteraction, Snowflake } from 'discord.js'
import { Betting } from './games/Betting';
import { Interaction } from '../managers/Interaction';
import { CivilWar } from './games/CivilWar';
import { Messages } from '../language/message';
import { InteractionOption } from './interactions/InteractionOptions';
import { TicTacToe } from './interactions/tic-tac-toe';
import { Command } from '../managers/Command';
import mongoose from 'mongoose';

export class Client extends Discord.Client {
  public readonly commands: Collection<string, Command>;
  public readonly interactions: Collection<string, Interaction<ButtonInteraction | ModalSubmitInteraction | StringSelectMenuInteraction, unknown>>;
  public readonly interactionOptions: Collection<string, InteractionOption<any>>;
  public readonly coin: Collection<string, string>;
  public readonly betting: Collection<Snowflake, Betting>;
  public readonly tictactoe: Collection<Array<Snowflake>, TicTacToe>;
  public readonly alarmMembers: Collection<Snowflake, GuildMember>;
  public readonly slangs: Collection<Snowflake, Message>;
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
    this.tictactoe = new Collection();
    this.alarmMembers = new Collection();
    this.slangs = new Collection();
    this.civilWar = new CivilWar();
    this.messages = new Messages();
    this.models = {};
  }
}