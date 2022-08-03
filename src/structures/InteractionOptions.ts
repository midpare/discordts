import { Message } from 'discord.js';

export class InteractionOptions {
  public readonly ids: string[];
  public readonly cmd: string
  public readonly customIds: string[];
  public readonly messages: Message[];
  public readonly etc?: any | null

  constructor(options: InteractionOptions) {
    this.ids = options.ids;
    this.cmd = options.cmd
    this.customIds = options.customIds;
    this.messages = options.messages;
    this.etc = options.etc;
  }
}