import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Message, MessageEditOptions, Snowflake } from "discord.js";
import { Client } from "../Client";
import { Utils } from "../Utils";
import { InteractionOption } from "./InteractionOptions";

const items = [
  {
    id: 'protection',
    label: '파괴방지권',
    price: 750000,
    description: '장비 강화 시 파괴를 막을 수 있습니다.',
  },
];

interface Item {
  id: string;
  label: string;
  price: number;
}

export class Buy {
  public item: Item;
  public count: number;
  private options: InteractionOption<Buy | null>;
  private client: Client;

  constructor(client: Client, item: Item, options: InteractionOption<Buy | null>) {
    this.item = item; 
    this.count = 1;
    this.options = options;
    this.client = client;
  }

  get countButtons(): Array<ActionRowBuilder<ButtonBuilder>> {
    const plus = [1, 5, 10, 20, 50]

    const rows = new Array();
    const customIds = Utils.uuid(12);
    for (let i = 0; i < 2; i++) {
      const row = new ActionRowBuilder();
      for (let j = 0; j < 5; j++) {
        const customId = i == 0 ? customIds[j] : customIds[j + 5]
        row.addComponents(
          new ButtonBuilder()
            .setCustomId(customId)
            .setStyle(i == 0 ? ButtonStyle.Success : ButtonStyle.Danger)
            .setLabel(`+${plus[j]}`),
        );
        
        this.client.interactionOptions.set(customId, Object.assign({}, this.options, { customIds, cmd: 'update count', data: this }));
      }

      rows.push(row);
    }

    const buttons = [
      new ButtonBuilder()
        .setCustomId(customIds[10])
        .setStyle(ButtonStyle.Primary)
        .setLabel('변경 종료'),
      new ButtonBuilder()
        .setCustomId(customIds[11])
        .setStyle(ButtonStyle.Secondary)
        .setLabel('취소'),
    ];

    rows.push(new ActionRowBuilder().setComponents(buttons));
    return rows;
  }

  public async send(options: MessageEditOptions) {
    this.options.messages[0] = await this.options.messages[0].edit(options)
  }
}