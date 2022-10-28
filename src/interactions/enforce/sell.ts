import { GuildMember, SelectMenuBuilder, SelectMenuInteraction } from 'discord.js';
import { Interaction } from '../../managers/Interaction';
import { enforceTable } from '../../structures/games/enforce';

export default new Interaction<SelectMenuInteraction>({
  name: 'enforce_sell',
  deleted:  false,
  execute: async ({ interaction, options, client }) => {
    const { guildId, user: { id } } = interaction;

    const item = options?.data.items.filter((e: { name: string }) => e.name == interaction.values[0])[0];
    const { sell: money } = enforceTable[item.rank - 2];

    (await client.models.gambling.updateOne({ id, guildId }, { $pull: { items: item }, $inc: { money } })).matchedCount;

    if (interaction.member instanceof GuildMember)
      interaction.reply(`${interaction.member.displayName}님이 "${item.name}"을(를) ${money.toLocaleString()}원에 판매했습니다!`);
    
    options?.messages[0].delete();
  },
});