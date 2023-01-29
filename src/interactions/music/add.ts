import { ModalBuilder, TextInputBuilder, ButtonInteraction, TextInputStyle, ActionRowBuilder, GuildMember } from 'discord.js';
import { Interaction } from '../../managers/Interaction';

export default new Interaction<ButtonInteraction, null>({
  name: 'add music',
  execute: async ({ interaction }) => {
    const { guild, member } = interaction
    if (!guild || !(member instanceof GuildMember))
      return;
      
    if (!member.voice.channelId) {
      interaction.reply({ content: '먼저 음성채널에 접속해주시기 바랍니다.', ephemeral: true });
      return;
    }
    const modal = new ModalBuilder()
      .setCustomId('select play')
      .setTitle('노래')

    const row = <ActionRowBuilder<TextInputBuilder>>new ActionRowBuilder()
      .setComponents(new TextInputBuilder()
        .setCustomId('title')
        .setLabel('노래의 제목을 입력해주세요')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('이곳에 입력해주세요'),
    );

    modal.addComponents(row);
     
    interaction.showModal(modal);
  },
});