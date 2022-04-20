import { client } from '../structures/Client';
import { ButtonInteraction, Interaction } from 'discord.js';

export = {
  name: 'interactionCreate',
  event: async (interaction: Interaction) => {
    if (interaction instanceof ButtonInteraction) {
      const cmd = interaction.customId;
      const events = client.interactions.get(cmd);
      if (!events) 
        return;
      try {
        events.execute(interaction);
      } catch(error) {
        console.error(error);
      }
    }
  },
}