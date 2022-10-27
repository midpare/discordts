import { ButtonInteraction } from 'discord.js';
import { Interaction } from '../../managers/Interaction';

export default new Interaction<ButtonInteraction>({
  name: 'protection',
  deleted: false,
  execute: async ({ interaction, options }) => {
    if (!options) 
      return; 

    const { enforce } = options?.data;
    enforce.protection = !enforce.protection;
    
    enforce.send({ content: '파괴방지권을 사용했습니다!', embeds: [enforce.embed], components: [enforce.button] });
    interaction.deferUpdate();
  },
});