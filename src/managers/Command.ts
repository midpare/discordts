import { 
  LocalizationMap, 
  ApplicationCommandType, 
  ChatInputCommandInteraction, 
  CommandInteractionOptionResolver, 
  ApplicationCommandOptionData,
} from 'discord.js'
import { Client } from '../structures/Client';

type ExecuteType = (options: {
  interaction: ChatInputCommandInteraction;
  options: CommandInteractionOptionResolver;
  client: Client;
}) => Promise<number>;

export class Command {
  public readonly name: string;
  public readonly aliases?: string[];
  public readonly category: string
  public readonly usage: string;
  public readonly description: string;
  public readonly nameLocalizations?: LocalizationMap;
  public readonly descriptionLocalizations?: LocalizationMap;
  public readonly default_member_permissions?: bigint | string
  public readonly type?: ApplicationCommandType.ChatInput;
  public readonly options?: ApplicationCommandOptionData[];
  public readonly execute: ExecuteType;

  constructor(options: Command) {
    Object.assign(this, options);
    this.name = options.name;
    this.category = options.category;
    this.usage = options.usage;
    this.description = options.description;
    this.default_member_permissions = options.default_member_permissions?.toString();
    this.execute = options.execute;
  }
}