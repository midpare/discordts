import { ButtonInteraction } from 'discord.js';
import { Interaction } from '../../managers/Interaction';

export default new Interaction<ButtonInteraction>({
  name: 'protection',
  deleted: false,
  execute: async ({ interaction, options, client }) => {
    if (!options) 
      return; 

    const { enforce } = options?.data;
    enforce.protection = !enforce.protection;
    
    enforce.send({ embeds: [enforce.embed], components: [enforce.button] });
    interaction.deferUpdate();
  },
});