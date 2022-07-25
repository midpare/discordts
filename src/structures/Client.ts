import { ButtonInteraction, Client, ClientOptions, Collection, SelectMenuInteraction, Snowflake } from 'discord.js'
import { Betting } from './Betting';
import { Command } from '../managers/Commands';
import { InteractionCommand } from '../managers/Interaction';
import { CivilWar } from './CivilWar';
import { Messages } from '../language/message';
import { InteractionOptions } from './InteractionOptions';

export class ExtendClient extends Client {
  public commands: Collection<string, Command>;
  public interactions: Collection<string, InteractionCommand<ButtonInteraction | SelectMenuInteraction>>;
  public interactionOptions: Collection<string, InteractionOptions>;
  public coin: Collection<string, string>;
  public sdCode: Collection<string, string>;
  public betting: Collection<Snowflake, Betting>;
  public civilWar: CivilWar;
  public messages: Messages

  constructor(options: ClientOptions) {
    super(options);

    this.commands = new Collection();
    this.interactions = new Collection();
    this.interactionOptions = new Collection();
    this.coin = new Collection();
    this.sdCode = new Collection();
    this.betting = new Collection();
    this.civilWar = new CivilWar();
    this.messages = new Messages();
  }
}