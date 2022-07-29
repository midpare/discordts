import Discord, { ButtonInteraction, ClientOptions, Collection, GuildMember, SelectMenuInteraction, Snowflake } from 'discord.js'
import { Betting } from './games/Betting';
import { Command } from '../managers/Commands';
import { Interaction } from '../managers/Interaction';
import { CivilWar } from './games/CivilWar';
import { Messages } from '../language/message';
import { InteractionOptions } from './InteractionOptions';
import { Model } from './Model';
import { TicTacToe } from './games/tic-tac-toe';
import { SlashCommand } from '../managers/SlashCommand';

export class Client extends Discord.Client {
  public readonly commands: Collection<string, Command>;
  public readonly slashCommand: Collection<string, SlashCommand>;
  public readonly interactions: Collection<string, Interaction<ButtonInteraction | SelectMenuInteraction>>;
  public readonly interactionOptions: Collection<string, InteractionOptions>;
  public readonly coin: Collection<string, string>;
  public readonly sdCode: Collection<string, string>;
  public readonly betting: Collection<Snowflake, Betting>;
  public readonly tictactoe: Collection<Array<Snowflake>, TicTacToe>; 
  public readonly civilWar: CivilWar;
  public readonly messages: Messages;
  public readonly models: Model;

  constructor(options: ClientOptions) {
    super(options);

    this.commands = new Collection();
    this.slashCommand = new Collection();
    this.interactions = new Collection();
    this.interactionOptions = new Collection();
    this.coin = new Collection();
    this.sdCode = new Collection();
    this.betting = new Collection();
    this.tictactoe = new Collection
    this.civilWar = new CivilWar();
    this.messages = new Messages();
    this.models = new Model();
  }
}