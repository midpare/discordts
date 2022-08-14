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

    const { guildId } = interaction;

    if (!guildId)
      return;

    const guild = await client.models.guild.findOne({ id: guildId });

    const civilWarChannel = guild.civilWar;
    if (civilWarChannel.length < 2) {
      Utils.reply(interaction, '내전채널을 등록해주시기 바랍니다.');
    }

    const channel1 = <VoiceChannel>client.guilds.cache.get(guildId)?.channels.cache.get(civilWarChannel[0]);
    const channel2 = <VoiceChannel>client.guilds.cache.get(guildId)?.channels.cache.get(civilWarChannel[1]);

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