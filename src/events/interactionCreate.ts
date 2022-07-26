import { Client } from '../structures/Client';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, BaseInteraction } from 'discord.js';
import { Event } from '../managers/Event';

export default new Event({
  name: 'interactionCreate',
  execute: async (interaction: BaseInteraction) => {
    const client = <Client>interaction.client;

    if (!interaction.isButton() && !interaction.isSelectMenu())
      return;

    const id = interaction.user.id;

    const options = client.interactionOptions.get(interaction.customId);
    let event = client.interactions.get(interaction.customId); 

    if (!options && event) {
      event.execute({ interaction, options, client });
      return;
    }
    
    if (!options || options.id != id)
      return;

    event = client.interactions.get(options.cmd);

    if (!event)
      return;

    try {
      if (options.cmd != 'cancel')
        event.execute({ interaction, options, client });

      for (const id of options.customIds) {
        client.interactionOptions.delete(id)
      }
      options.message.delete();
    } catch (error) {
      console.error(error);
    }
  },
});