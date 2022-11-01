import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import messageCreate from '../../events/messageCreate';
import { Interaction } from '../../managers/Interaction';
import { Utils } from '../../structures/Utils';

const plus = [
  1,
  3,
  5,
  10,
  30,
];

export default new Interaction({
  name: 'buy-count',
  deleted: false,
  execute: async ({ interaction, options, client }) => {
    if (!options)
      return;
    
    const buy = options.data.buy
    const { item, count } = buy;
    const rows = buy.countButtons

    options.messages[0].edit({ content: `현재 ${item.label}의 수량은 ${count.toLocaleString()}개 입니다.\n총 가격: ${(item.price * count).toLocaleString()}원, 개당 가격: ${item.price.toLocaleString()}원`, components: rows });

    interaction.deferUpdate();
  },
});