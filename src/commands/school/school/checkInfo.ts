import { MessageEmbed } from 'discord.js';
import { Command } from '../../../managers/Commands';

export default new Command({
  name: '학교 정보확인',
  aliases: ['학교 정보'],
  category: '학교',
  usage: '학교 정보확인',
  description: '현재 자신의 학교 정보를 확인합니다.',
  execute: async ({ msg, client }) => {
    const id = msg.author.id;
    const user = await  client.models.school.findOne({ id });
    const embed = new MessageEmbed();
    if (!user)
      return msg.reply('정보등록이 되지 않은 유저입니다.\n!학교 정보등록 <시도(서울특별시)> <학교이름(@@중학교)><학년반(1학년 2반)>\n으로 정보등록을 해주시기 바랍니다.');
    embed
      .setTitle(`${msg.author.username}님의 학교정보`)
      .setDescription(`${user.cityName} ${user.schoolName} ${user.grade}학년 ${user.class}반`)
      .setColor('GREEN');
    msg.channel.send({ embeds: [embed] });
  },
});