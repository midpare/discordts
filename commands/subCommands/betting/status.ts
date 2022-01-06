import { MessageEmbed } from 'discord.js';
import { Command } from '../../../structures/Commands';
import { bet1, bet2, betting } from '../../../structures/Betting';

export default new Command({
  name: '현황',
  category: '베팅',
  usage: '베팅 현황',
  description: '현재 베팅의 현황을 확인합니다.',
  execute: async ({ msg, args }) => {
    if (!betting.betting)
      return msg.reply('아직 베팅을 시작하지 않았습니다.');

    const embed = new MessageEmbed();

    let persent: number;
    if (bet1.sum == 0)
      persent = 0;
    else
      persent = (bet1.sum / (bet1.sum + bet2.sum) * 100);
    bet1.times = Math.round(100 / (persent) * 100) / 100;

    if (persent == 100)
      bet2.times = 0;
    else
      bet2.times = Math.round(100 / (100 - persent) * 100) / 100;

    embed
      .setTitle('베팅 현황')
      .setDescription('베팅 현황을 확인합니다.')
      .setFields(
        { name: `${bet1.name}`, value: `${bet1.sum.toLocaleString()}원(${Math.round(persent)}%) \n참여인원: ${bet1.list.length.toLocaleString()}명 \n배율: ${bet1.times}배`, inline: true },
        { name: `${bet2.name}`, value: `${bet2.sum.toLocaleString()}원(${Math.round(100 - persent)}%) \n참여인원: ${bet2.list.length.toLocaleString()}명 \n배율: ${bet2.times}배`, inline: true },
      );

    msg.channel.send({ embeds: [embed] });
  },
});