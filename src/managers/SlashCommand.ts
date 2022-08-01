import { 
  BaseApplicationCommandData, 
  LocalizationMap, 
  ApplicationCommandType, 
  PermissionResolvable, 
  ChatInputCommandInteraction, 
  CommandInteractionOptionResolver, 
  ApplicationCommandOptionData
} from 'discord.js'
import { Client } from '../structures/Client';

type ExecuteType = (options: {
  interaction: ChatInputCommandInteraction;
  options: CommandInteractionOptionResolver;
  client: Client;
}) => Promise<void>

export class SlashCommand implements BaseApplicationCommandData {
  public name: string;
  public aliases?: string[];
  public category: string
  public usage?: string;
  public description: string;
  public nameLocalizations?: LocalizationMap;
  public descriptionLocalizations?: LocalizationMap;
  public defaultMemberPermissions?: PermissionResolvable | null;
  public type?: ApplicationCommandType.ChatInput;
  public options?: ApplicationCommandOptionData[];
  public execute: ExecuteType;

  constructor(options: SlashCommand) {
    this.name = options.name;
    this.category = options.category;
    this.usage = options.usage ?? options.name;
    this.description = options.description;
    this.execute = options.execute;
    Object.assign(this, options);
  }
}