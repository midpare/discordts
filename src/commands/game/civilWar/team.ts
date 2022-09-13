import { EmbedBuilder, GuildMember } from 'discord.js';
import { Command } from '../../../managers/Command';
import { Utils } from '../../../structures/Utils';

export default new Command({
  name: '내전시작',
  aliases: ['내전팀나누기', '내전팀'],
  category: '게임',
  usage: '내전시작',
  description: '현재 음성채팅방에 있는 유저를 1팀과 2팀으로 나눕니다.',
  execute: async ({ interaction, client }) => {
    const user = interaction.member;
    if (!(user instanceof GuildMember) || !user.voice.channel) {
      Utils.reply(interaction, '음성채널에 접속해주시기 바랍니다.');
      return 0;
    }

    const members = Utils.shuffle(Array.from(user.voice.channel.members.values() || []));
    const civilWar = client.civilWar;
    if (members.length < 2) {
      Utils.reply(interaction, '현재 음성채널에 두명이상 접속해있지 않습니다.');
      return 0;
    }
    
    if (!civilWar.isEmpty()) {
      Utils.reply(interaction, '이미 시작한 내전이 있습니다.');
      return 0;
    }


    civilWar.setTeam(members);
    civilWar.setChannel(user.voice.channel);

    const embed = new EmbedBuilder()
      .setTitle('팀')
      .addFields(
        { name: '1팀', value: `${civilWar.teams[0].join(', ')}`, inline: false},
        { name: '2팀', value: `${civilWar.teams[1].join(', ')}`, inline: false},
      );

    interaction.reply({ embeds: [embed] });
    return 1;
  },
});