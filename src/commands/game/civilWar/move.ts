import { VoiceChannel } from 'discord.js';
import { Command } from '../../../managers/Command';
import { Utils } from '../../../structures/Utils';

export default new Command({
  name: '내전이동',
  category: '게임',
  usage: '내전이동',
  description: '팀을 나눈 유저들을 내전방으로 이동시킵니다.',
  execute: async ({ interaction, client }) => {
    const civilWar = client.civilWar;

    if (civilWar.isEmpty()) {
      Utils.reply(interaction, '이동할 유저가 없습니다.');
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
    interaction.reply('성공적으로 유저들을 이동했습니다!');
  },
});