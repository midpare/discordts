import { ExtendClient } from '../structures/Client';
import { ButtonInteraction, Interaction } from 'discord.js';
import { Event } from '../managers/Event';

export default new Event ({
  name: 'interactionCreate',
  execute: async (interaction: Interaction) => {
    const client = interaction.client;
    if (!(client instanceof ExtendClient) || !(interaction instanceof ButtonInteraction))
      return

    const cmd = interaction.customId;
    const events = client.interactions.get(cmd);
    if (!events) 
      return;
    try {
      events.execute({interaction, client});
    } catch(error) {
      console.error(error);
    }
  },
});