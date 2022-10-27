import { GuildMember } from 'discord.js';
import { Interaction } from '../../managers/Interaction';

export default new Interaction({
  name: 'enforce_sell',
  deleted:  false,
  execute: async ({ interaction, options, client }) => {
    const { guildId, user: { id } } = interaction;
    const { item, money } = options?.data;

    (await client.models.gambling.updateOne({ id, guildId }, { $pull: { items: item }, $inc: { money } })).matchedCount;

    if (interaction.member instanceof GuildMember)
      options?.messages[0].edit(`${interaction.member.displayName}님이 "${item.name}"을(를) ${money}원에 판매했습니다!`);
    
    options?.messages[0].delete();
    interaction.deferUpdate();  
  },
});