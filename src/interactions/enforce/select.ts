import { SelectMenuInteraction } from 'discord.js';
import { Interaction } from '../../managers/Interaction';
import { Enforce } from '../../structures/games/enforce';

export default new Interaction<SelectMenuInteraction>({
  name: 'select_enforce',
  deleted: false,
  execute: async ({ interaction, options, client }) => {
    if (!options)
      return;
    const { guildId, user: { id } } = interaction;
    const user = await client.models.gambling.findOne({ id, guildId });
    const item = user.items.filter((e: { name: string }) => e.name == interaction.values[0])[0]

    if (item.rank > 9) {
      interaction.reply('이 장비는 이미 10강까지 강화를 완료했습니다.');
      return; 
    }

    const enforce = new Enforce(client, options, interaction.values[0], user);

    enforce.send({ content: null, embeds: [enforce.embed], components: [enforce.button] });

    interaction.deferUpdate();
  },
});