import { VoiceChannel } from 'discord.js';
import { Command } from '../../../managers/Commands';

export default new Command({
  name: '내전 이동',
  aliases: ['내전 시작'],
  category: '게임',
  usage: '내전 이동',
  description: '팀을 나눈 유저들을 내전방으로 이동시킵니다.',
  execute: async ({ msg, client }) => {
    const civilWar = client.civilWar
    if (!civilWar.team1[0])
      return msg.reply('이동할 멤버가 없습니다.');
    let team1 = civilWar.team1;
    let team2 = civilWar.team2;

    const channel1 = <VoiceChannel>client.channels.cache.get('910521120158019624');
    const channel2 = <VoiceChannel>client.channels.cache.get('910521120158019625');

    for (const user of team1) {
      if (!user.voice || user.voice.channelId == null)
        continue;
      user.voice.setChannel(channel1);
    }

    for (const user of team2) {
      if (!user.voice || user.voice.channelId == null)
        continue;
      user.voice.setChannel(channel2);
    }
  },
});