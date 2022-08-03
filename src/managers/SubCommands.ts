import { 
  ChatInputCommandInteraction, 
  CommandInteractionOptionResolver, 
  LocalizationMap, 
  ApplicationCommandOptionType, 
  ApplicationCommandChoicesData,
  ApplicationCommandNonOptionsData,
  ApplicationCommandChannelOptionData,
  ApplicationCommandAutocompleteOption,
  ApplicationCommandNumericOptionData,
  ApplicationCommandStringOptionData,
} from 'discord.js';
import { Client } from '../structures/Client';

type ExecuteType = (options: {
  interaction: ChatInputCommandInteraction;
  options: CommandInteractionOptionResolver;
  client: Client;
}) => Promise<void>

export class SubCommand {
  public readonly name: string;
  public readonly aliases?: string[];
  public readonly category: string
  public readonly usage?: string;
  public readonly nameLocalizations?: LocalizationMap;
  public readonly description: string;
  public readonly descriptionLocalizations?: LocalizationMap;
  public readonly options?: (
    | ApplicationCommandChoicesData
    | ApplicationCommandNonOptionsData
    | ApplicationCommandChannelOptionData
    | ApplicationCommandAutocompleteOption
    | ApplicationCommandNumericOptionData
    | ApplicationCommandStringOptionData
  )[];
  public readonly type?: ApplicationCommandOptionType.Subcommand;
  public readonly execute: ExecuteType;

  constructor(options: SubCommand) {
    Object.assign(this, options);
    this.name = options.name;
    this.description = options.description;
    this.category = options.category;
    this.execute = options.execute;
    this.type = ApplicationCommandOptionType.Subcommand;
  }
}