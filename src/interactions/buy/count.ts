import { ButtonInteraction } from 'discord.js';
import { Interaction } from '../../managers/Interaction';
import { Buy } from '../../structures/interactions/buy';

export default new Interaction<ButtonInteraction, Buy>({
  name: 'buy count',
  execute: async ({ interaction, options }) => {
    const buy = options.data;
    const { item, count } = buy;
    const rows = buy.countButtons;

    buy.send({ content: `현재 ${item.label}의 수량은 ${count.toLocaleString()}개 입니다.\n총 가격: ${(item.price * count).toLocaleString()}원, 개당 가격: ${item.price.toLocaleString()}원`, components: rows });

    interaction.deferUpdate();
  },
});