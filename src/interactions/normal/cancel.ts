import { ButtonInteraction } from 'discord.js';
import { Interaction } from '../../managers/Interaction.js';

export default new Interaction<ButtonInteraction, null>({
  name: 'cancel',
  execute: async ({ interaction }) => {
    interaction.message.delete();
  },
});