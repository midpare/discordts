import { Message } from "discord.js";

export class InteractionOptions {
  public readonly id: string;
  public readonly cmd: string
  public readonly customIds: string[];
  public readonly message: Message;

  constructor(options: InteractionOptions) {
    this.id = options.id;
    this.cmd = options.cmd
    this.customIds = options.customIds;
    this.message = options.message
  }
}