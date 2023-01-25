import { ActionRowBuilder, ButtonBuilder } from '@discordjs/builders';
import { ButtonInteraction, ButtonStyle, Colors, EmbedBuilder } from 'discord.js';
import { Interaction } from '../../managers/Interaction';

export default new Interaction<ButtonInteraction, null>({
  name: 'check slang',
  execute: async ({ interaction, client }) => {
    interaction.deferUpdate();
    
    const { user: { id }, guildId } = interaction;
    const guild = await client.models.guild.findOne({ id: guildId });
  
    const row = <ActionRowBuilder<ButtonBuilder>>new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setCustomId('delete dm message')
        .setLabel('메시지 삭제')
        .setStyle(ButtonStyle.Primary),
    );
    
    if (!guild.slangAvailible.includes(id)) {
      const embed = new EmbedBuilder()
        .setTitle('망언을 확인할 권한이 없습니다.')
        .setDescription('망언을 보유한 유저만이 다른 유저의 망언을 확인할 수 있습니다.')
        .setColor(Colors.Red);
      interaction.user.send({ embeds: [embed], components: [row] });
      return;
    }
    
    const targetId = interaction.message.embeds[0].data.title?.split('(')[1]?.split(')')[0];
    const user = await client.models.config.findOne({ id: targetId, guildId });
    
    for (let i = 0; i < user.slangs.length; i++) {
      user.slangs[i] = `${i + 1}. ${user.slangs[i]}`;
    }

    const embed = new EmbedBuilder()
      .setTitle(`${user.name}(${user.id})님의 망언`)
      .setDescription(user.slangs.join('\n'));
    
    interaction.user.send({ embeds: [embed], components: [row] });
  },
});