import { ButtonInteraction } from 'discord.js';
import { Interaction } from '../../managers/Interaction';
import { Enforce } from '../../structures/interactions/enforce';

export default new Interaction<ButtonInteraction, Enforce>({
  name: 'protection',
  execute: async ({ interaction, options }) => {
    const enforce = options.data;
    enforce.protection = !enforce.protection;
    
    enforce.send({ content: '파괴방지권을 사용했습니다!', embeds: [enforce.embed], components: [enforce.button] });
    interaction.deferUpdate();
  },
});