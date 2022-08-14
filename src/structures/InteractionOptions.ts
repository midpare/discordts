import { Message, Snowflake } from 'discord.js';

export class InteractionOption {
  public ids: Snowflake[];
  public guildId: Snowflake
  public cmd: string
  public customIds: string[];
  public messages: Message[];
  public data?: any;

  constructor(option: InteractionOption) {
    this.ids = option.ids;
    this.guildId = option.guildId;
    this.cmd = option.cmd;
    this.customIds = option.customIds;
    this.messages = option.messages;
    this.data = option.data;
  }

  public static getNext(options: InteractionOption, target: Partial<InteractionOption>): InteractionOption {
    let i: keyof InteractionOption;

    for (i in target) {
      let data = target[i];
      if (i == 'data') {
        let j: keyof InteractionOption['data'];
        for (j in target.data) {
          options.data[j] = target.data[j];
        }
      } else if (data) {
        options[i] = data;
      }
    }
    
    const newOptions = new InteractionOption(options);
    return newOptions;
  }
}