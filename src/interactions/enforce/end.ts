import { ButtonInteraction, ChannelType, GuildMember } from 'discord.js';
import { Interaction } from '../../managers/Interaction';
import { Enforce } from '../../structures/interactions/enforce';

export default new Interaction<ButtonInteraction, Enforce>({
  name: 'enforce end',
  execute: async ({ interaction, options }) => {
    const enforce = options.data;
    
    if (interaction.member instanceof GuildMember && interaction.channel?.type == ChannelType.GuildText)
      interaction.channel.send(`${interaction.member.displayName}님이 "${enforce.item.name}"을(를) ${enforce.item.rank}강까지 강화했습니다!`)

    options.message.delete();
    interaction.deferUpdate();
  },
});