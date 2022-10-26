import { SelectMenuInteraction } from 'discord.js';
import { Interaction } from '../../managers/Interaction';
import { Enforce } from './struct';

export default new Interaction<SelectMenuInteraction>({
  name: 'select',
  deleted: false,
  execute: async ({ interaction, options, client }) => {
    if (!options)
      return;
    const { guildId, user: { id } } = interaction;
    const user = await client.models.gambling.findOne({ id, guildId });
    const item = user.items.filter((e: { name: string }) => e.name == interaction.values[0])[0]

    const enforce = new Enforce(client, options, item.name, item.rank, options.messages[0])

    enforce.send({ content: null, embeds: [enforce.embed], components: [enforce.button] });

    interaction.deferUpdate();
  },
});