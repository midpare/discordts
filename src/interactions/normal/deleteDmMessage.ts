import { ButtonInteraction } from 'discord.js';
import { Interaction } from '../../managers/Interaction.js';

export default new Interaction<ButtonInteraction, null>({
  name: 'delete dm message',
  execute: async ({ interaction }) => {
    await interaction.user.createDM();
    interaction.message.delete();
  }, 
});