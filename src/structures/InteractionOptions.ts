import { Message } from "discord.js";

export class InteractionOptions {
  public id: string;
  public cmd: string
  public customIds: string[];
  public message: Message;

  constructor(options: InteractionOptions) {
    this.id = options.id;
    this.cmd = options.cmd
    this.customIds = options.customIds;
    this.message = options.message
  }
}