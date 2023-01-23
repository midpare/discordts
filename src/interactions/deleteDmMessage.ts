import { ButtonInteraction } from 'discord.js';
import { Interaction } from '../managers/Interaction';

export default new Interaction<ButtonInteraction, null>({
  name: 'delete dm message',
  execute: async ({ interaction }) => {
    await interaction.user.createDM();
    interaction.message.delete();
  }, 
});