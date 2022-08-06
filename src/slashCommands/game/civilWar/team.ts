import { EmbedBuilder, GuildMember } from 'discord.js';
import { SlashCommand } from '../../../managers/SlashCommand';
import { Utils } from '../../../structures/Utils';

export default new SlashCommand({
  name: '내전 시작',
  aliases: ['내전 팀나누기', '내전 팀'],
  category: '게임',
  usage: '내전 팀 <이름> <이름> ...',
  description: '<이름>만큼의 유저를 1팀과 2팀으로 나눕니다.',
  execute: async ({ interaction, client }) => {
    const user = interaction.member;
    if (!(user instanceof GuildMember) || !user.voice.channel) {
      Utils.reply(interaction, '음성채널에 접속해주시기 바랍니다.');
      return;
    }

    const members = Utils.shuffle(Array.from(user.voice.channel.members.values() || []));
    const civilWar = client.civilWar;
    if (members.length < 2) {
      Utils.reply(interaction, '현재 음성채널에 두명이상 접속해있지 않습니다.');
      return;
    }
    
    if (!civilWar.isEmpty()) {
      Utils.reply(interaction, '이미 시작한 내전이 있습니다.');
      return;
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
  },
});