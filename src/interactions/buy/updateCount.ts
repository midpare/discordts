import { ButtonInteraction } from 'discord.js';
import { Interaction } from '../../managers/Interaction';
import { Buy } from '../../structures/interactions/buy';

interface BuyD extends Buy {
  d: number
}

export default new Interaction<ButtonInteraction, BuyD>({
  name: 'update count',
  execute: async ({ interaction, options, client }) => {
    const buy = options.data;
    const { count } = buy

    if (count + buy.d < 1) {
      buy.send({ content: `개수는 반드시 1 이상이어야 합니다. 현재 개수: `})
    }
  },
});