import { GuildMember } from 'discord.js';
import { Interaction } from '../../managers/Interaction';

export default new Interaction({
  name: 'enforce_end',
  deleted: false,
  execute: async ({ interaction, options, client }) => {
    const { enforce } = options?.data;
    
    if (interaction.member instanceof GuildMember)
      interaction.channel?.send(`${interaction.member.displayName}님이 "${enforce.itemName}"을(를) ${enforce.rank}강까지 강화했습니다!`)

    options?.messages[0].delete();
    interaction.deferUpdate();
  },
});