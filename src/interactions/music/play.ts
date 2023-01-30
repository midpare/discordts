import { StringSelectMenuInteraction, GuildMember, BaseGuildTextChannel } from 'discord.js';
import { Interaction } from '../../managers/Interaction';
import { createAudioPlayer, getVoiceConnection, joinVoiceChannel } from '@discordjs/voice'
import { Music } from '../../structures/interactions/music';

export default new Interaction<StringSelectMenuInteraction, string>({
  name: 'play music',
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
    const { music: { channel: channelId, message: messageId } } = await client.models.guild.findOne({ id });
    const channel = await guild.channels.fetch(channelId)
    if (!(channel instanceof BaseGuildTextChannel)) 
      return;
    
    const message = (await channel.messages.fetch()).filter(e => e.id == messageId).first();
  
    const connection = getVoiceConnection(id) ?? joinVoiceChannel({
      channelId: member.voice.channelId,
      guildId: id,
      adapterCreator: voiceAdapterCreator,
      selfDeaf: false,
    });
    
    const { url, search, title, duration } = client.interactionOptions.get(interaction.values[0])?.data;

    const data = {
      url,
      title,
      search,
      duration,
      requestBy: member.displayName,
    }
    const player = createAudioPlayer();

    let music = client.music.get(id);
    if (!music) {      
      music = new Music(connection, player, message!)
      client.music.set(id, music);
    } else if(music && !music.currunt) {
      music.connection = connection;
    }
    
    music.pushData(data);
  },
});