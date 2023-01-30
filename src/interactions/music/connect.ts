import { getVoiceConnection, joinVoiceChannel } from '@discordjs/voice';
import { ButtonInteraction, GuildMember } from 'discord.js';
import { Interaction } from '../../managers/Interaction';

export default new Interaction<ButtonInteraction, null>({
  name: 'connect music',
  execute: async ({ interaction, client }) => {
    interaction.deferUpdate();    

    const { guild, member } = interaction;
    if (!guild || !(member instanceof GuildMember))
      return;

    if (!member.voice.channelId) {
      interaction.reply({ content: '먼저 음성채널에 접속해주시기 바랍니다.', ephemeral: true });
      return;
    }
 
    const { id, voiceAdapterCreator } = guild;
    let connection = getVoiceConnection(id);
    
    if (connection?.joinConfig.channelId == member.voice.channelId) {
      interaction.reply({ content: '이미 봇이 연결되어 있습니다.', ephemeral: true });
      return;
    }

    connection = joinVoiceChannel({
      channelId: member.voice.channelId,
      guildId: id,
      adapterCreator: voiceAdapterCreator,
      selfDeaf: false,
    });

    const music = client.music.get(id);
    if (music) {
      connection.subscribe(music.player);
      music.connection = connection;
    }
  },
});