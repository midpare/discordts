import { Interaction } from '../../managers/Interaction';
import { GuildMember, StringSelectMenuInteraction } from 'discord.js';

export default new Interaction<StringSelectMenuInteraction, null>({
  name: 'delete music',
  execute: async ({ interaction, client }) => {
    const { guild, member } = interaction;
    if (!guild || !(member instanceof GuildMember))
      return;
      
    if (!member.voice.channelId) {
      interaction.reply({ content: '먼저 음성채널에 접속해주시기 바랍니다.', ephemeral: true });
      return;
    }

    const music = client.music.get(guild.id);
    if (!music || !(music.currunt)) {
      interaction.reply({ content: '이미 재생이 종료된 노래입니다.', ephemeral: true });
      return;
    }
    interaction.deferUpdate();

    music.delete(parseInt(interaction.values[0]));
  },
});