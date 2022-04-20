import { ExtendClient } from '../structures/Client';
import { ButtonInteraction, Interaction } from 'discord.js';

export = {
  name: 'interactionCreate',
  event: async (interaction: Interaction) => {
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
}