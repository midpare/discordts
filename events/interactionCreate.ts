import { ExtendInteraction } from '../typings/interaction';
import { client } from '../contexts/client';

export = {
  name: 'interactionCreate',
  event: async (interaction: ExtendInteraction) => {
    const cmd = interaction.customId;
    const events = client.interactions.get(cmd);
    if (!events) return;
    try {
      events.execute(interaction);
    } catch(error) {
      console.error(error);
    }
  },
}