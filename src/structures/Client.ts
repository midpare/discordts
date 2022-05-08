import { Client, ClientOptions, Collection, Snowflake } from 'discord.js'
import { Betting } from './Betting';
import { Command } from '../managers/Commands';
import { ExtendInteraction } from '../managers/Interaction';
import { CivilWar } from './CivilWar';
import { Messages } from '../language/message';

export class ExtendClient extends Client {
  public commands: Collection<string, Command>;
  public interactions: Collection<string, ExtendInteraction>;
  public coin: Collection<string, string>;
  public sdCode: Collection<string, string>;
  public betting: Collection<Snowflake, Betting>;
  public civilWar: CivilWar;
  public messages: Messages

  constructor(options: ClientOptions) {
    super(options);

    this.commands = new Collection();
    this.interactions = new Collection();
    this.coin = new Collection();
    this.sdCode = new Collection();
    this.betting = new Collection();
    this.civilWar = new CivilWar();
    this.messages = new Messages();
  }
}