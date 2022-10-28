import { GuildMember } from 'discord.js';
import { Interaction } from '../../managers/Interaction';
import { enforceTable } from '../../structures/games/enforce';

export default new Interaction({
  name: 'enforce_sell_yes',
  deleted: false,
  execute: async ({ interaction, options, client }) => {
    const { guildId, user: { id } } = interaction;
    
    const { item } = options?.data;
    const { sell: money } = enforceTable[item.rank - 2];
    
    (await client.models.gambling.updateOne({ id, guildId }, { $pull: { items: item }, $inc: { money } })).matchedCount;

    if (interaction.member instanceof GuildMember)
      interaction.channel?.send(`${interaction.member.displayName}님이 "${item.name}"을(를) ${money.toLocaleString()}원에 판매했습니다!`);

    options?.messages[0].delete();
    interaction.deferUpdate();
  },
});