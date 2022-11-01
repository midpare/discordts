import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { Utils } from "../Utils";

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
  public count: number

  constructor(item: Item) {
    this.item = item;
    this.count = 1;
  }

  get countButtons(): Array<ActionRowBuilder<ButtonBuilder>> {
    const plus = [
      1,
      3,
      5,
      10,
      30,
    ];

    const rows = new Array();
    const customIds = Utils.uuid(10);
    for (let i = 0; i < 2; i++) {
      const row = new ActionRowBuilder();
      for (let j = 0; j < 5; j++) {
        switch (i) {
          case 0:
            row.addComponents(
              new ButtonBuilder()
                .setCustomId(customIds[j])
                .setStyle(ButtonStyle.Success)
                .setLabel(`+${plus[j]}`),
            );
            break
          case 1:
            row.addComponents(
              new ButtonBuilder()
                .setCustomId(customIds[j + 5])
                .setStyle(ButtonStyle.Danger)
                .setLabel(`-${plus[j]}`),
            );
        }
      }
      rows.push(row)
    }
    return rows
  }
}