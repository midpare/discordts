import { EmbedBuilder } from 'discord.js';
import { Command } from '../../../managers/Commands';
import { Utils } from '../../../structures/Utils';

export default new Command({
  name: '내전 시작',
  aliases: ['내전 팀나누기', '내전 팀'],
  category: '게임',
  usage: '내전 팀 <이름> <이름> ...',
  description: '<이름>만큼의 유저를 1팀과 2팀으로 나눕니다.',
  execute: async ({ msg, client }) => {
    if (!msg.member?.voice.channel)
      return msg.reply('음성채널에 접속해주시기 바랍니다.');

    const members = Utils.shuffle(Array.from(msg.member?.voice.channel.members.values() || []));
    const civilWar = client.civilWar;
    if (members.length < 2)
      return msg.reply('현재 음성채널에 두명이상 접속해있지 않습니다.');
    
    if (!civilWar.isEmpty()) {
      return msg.reply('이미 시작한 내전이 있습니다.');
    }


    civilWar.setTeam(members);
    civilWar.setChannel(msg.member?.voice.channel);

    const embed = new EmbedBuilder()
      .setTitle('팀')
      .addFields(
        { name: '1팀', value: `${civilWar.teams[0].join(', ')}`, inline: false},
        { name: '2팀', value: `${civilWar.teams[1].join(', ')}`, inline: false},
      );

    msg.channel.send({ embeds: [embed] });
  },
});