import { ButtonInteraction } from 'discord.js';
import { Interaction } from '../managers/Interaction';

export default new Interaction<ButtonInteraction, any>({
  name: 'next page',
  execute: async ({ interaction, options, client }) => {
    
  },
});