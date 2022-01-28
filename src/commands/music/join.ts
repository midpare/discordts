import { Command } from '../../structures/Commands';
import { entersState, VoiceConnectionStatus } from '@discordjs/voice';
import { music } from '../../structures/Music';

export default new Command({
  name: 'join',
  category: '노래',
  usage: 'join',
  description: '봇이 음성채널에 들어갑니다.',
  execute: ({ msg, args }) => {
    const channel = msg.member.voice.channel;
    if (!channel)
      return msg.reply('음성채널에 접속해주시기 바랍니다.');
    
    if (channel.id == music.channelId)
      return msg.reply('이미 음성채널에 접속돼있습니다.');
    const connection = music.voiceChannel(channel);

    entersState(connection, VoiceConnectionStatus.Ready, 30000);    
    music.channelId = channel.id;
    msg.reply('성공적으로 음성채널에 접속했습니다!');
  },
});