import { Interaction } from '../../managers/Interaction';
import { ActionRowBuilder, GuildMember, StringSelectMenuBuilder } from 'discord.js';

export default new Interaction({
  name: 'select delete',
  execute: async ({ interaction, client }) => {
    const { guild, member } = interaction;
    if (!guild || !(member instanceof GuildMember))
      return;
      
    if (!member.voice.channelId) {
      interaction.reply({ content: '먼저 음성채널에 접속해주시기 바랍니다.', ephemeral: true });
      return;
    }

    const music = client.music.get(guild.id);
    if (!music || !music.currunt) {
      interaction.reply({ content: '현재 재생중인 노래가 없습니다.', ephemeral: true });
      return;
    }

    const row = <ActionRowBuilder<StringSelectMenuBuilder>>new ActionRowBuilder().setComponents(
      new StringSelectMenuBuilder()
        .setCustomId('delete music')
        .setPlaceholder('이곳을 눌러 선택해주세요.')
        .setOptions(music.selectMenuOption),
    );

    interaction.reply({ content: '삭제하고 싶은 노래를 선택해주세요.', ephemeral: true, components: [row] });
  },
});