import { VoiceChannel } from 'discord.js';
import { Command } from '../../../managers/Commands';

export default new Command({
  name: '내전 이동',
  category: '게임',
  usage: '내전 이동',
  description: '팀을 나눈 유저들을 내전방으로 이동시킵니다.',
  execute: async ({ msg, client }) => {
    const civilWar = client.civilWar

    if (civilWar.isEmpty()) {
      msg.reply('이동할 멤버가 없습니다.');
      return;
    }

    const channel1 = <VoiceChannel>client.channels.cache.get('1000704196552704010');
    const channel2 = <VoiceChannel>client.channels.cache.get('1000704543652323328');

    for (const user of civilWar.teams[0]) {
      if (!user.voice || user.voice.channelId == null)
        continue;
      user.voice.setChannel(channel1);
    }

    for (const user of civilWar.teams[1]) {
      if (!user.voice || user.voice.channelId == null)
        continue;
      user.voice.setChannel(channel2);
    }
  },
});