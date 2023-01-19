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
    const { guildId } = interaction;

    if (civilWar.isEmpty()) {
      Utils.reply(interaction, '이동할 유저가 없습니다.');
      return 0;
    }

    if (!guildId)
      return 0;

    const guild = await client.models.guild.findOne({ id: guildId });

    const channel1 = <VoiceChannel>interaction.guild?.channels.cache.get(guild.civilWar[0] ?? '0');
    const channel2 = <VoiceChannel>interaction.guild?.channels.cache.get(guild.civilWar[1] ?? '0');

    if (!channel1 || !channel2) {
      Utils.reply(interaction, '내전채널을 등록해주시기 바랍니다.');
      return 0;
    }

    for (const user of civilWar.teams[0]) {
      if (!user.voice || !user.voice.channelId)
        continue;
      user.voice.setChannel(channel1);
    }

    for (const user of civilWar.teams[1]) {
      if (!user.voice || !user.voice.channelId)
        continue;
      user.voice.setChannel(channel2);
    }
    interaction.reply('성공적으로 유저들을 이동했습니다!');
    return 1;
  },
});