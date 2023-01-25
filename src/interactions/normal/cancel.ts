import { ButtonInteraction } from 'discord.js';
import { Interaction } from '../../managers/Interaction';

export default new Interaction<ButtonInteraction, null>({
  name: 'cancel',
  execute: async ({ interaction }) => {
    interaction.message.delete();
  },
});