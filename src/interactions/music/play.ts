import { StringSelectMenuInteraction, GuildMember, BaseGuildTextChannel, Message } from 'discord.js';
import { Interaction } from '../../managers/Interaction';
import { createAudioPlayer, createAudioResource, getVoiceConnection, joinVoiceChannel } from '@discordjs/voice'
import ytdl from 'ytdl-core';
import { Music } from '../../structures/interactions/music';

export default new Interaction<StringSelectMenuInteraction, string>({
  name: 'play music',
  execute: async ({ interaction, client }) => {
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
    
    let message: Message;
    for (const [_, m] of (await channel.messages.fetch())) {
      if (m.id == messageId) {
        message = m
      }
    }
  
    const connection = getVoiceConnection(id) ?? joinVoiceChannel({
      channelId: member.voice.channelId,
      guildId: id,
      adapterCreator: voiceAdapterCreator,
    });
    
    const [videoId, title] = interaction.values[0].split(' ');
    const audio = ytdl(`http://youtube.com/watch?v=${videoId}`, {
      quality: 'highestaudio',
    });
    
    const resource = createAudioResource(audio);
    const player = createAudioPlayer();

    const music = client.music.get(id);
    if (!music) {
      client.music.set(id, new Music(connection, player, guild));  
      
      player.play(resource);
      connection?.subscribe(player);
    } else {
      music.pushResource(resource);
    }
    const test = 10;
    interaction.deferUpdate();
  },
});