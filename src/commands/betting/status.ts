import { MessageEmbed } from 'discord.js';
import { client } from '../../structures/Client';
import { Command } from '../../structures/Commands';

export default new Command({
  name: '베팅 현황',
  category: '베팅',
  usage: '베팅 현황',
  description: '현재 베팅의 현황을 확인합니다.',
  execute: async ({ msg, args }) => {
    const guildId = msg.guildId ?? ''
    const betting = client.betting.get(guildId);
    if (!betting)
      return msg.reply('아직 베팅을 시작하지 않았습니다.');

    const embed = new MessageEmbed();
    const persent = betting.persent;

    // bet1.times = Math.round(100 / (persent) * 100) / 100;

    // if (persent == 100)
    //   bet2.times = 0;
    // else
    //   bet2.times = Math.round(100 / (100 - persent) * 100) / 100;

    embed
      .setTitle('베팅 현황')
      .setDescription('베팅 현황을 확인합니다.')
      .setFields(
        { name: `${betting.bet1.name}`, value: `${betting.bet1.sum.toLocaleString()}원(${Math.round(persent.bet1)}%) \n참여인원: ${betting.bet1.user.length.toLocaleString()}명 \n배율: ${Math.round(betting.times.bet1 * 100) / 100}배`, inline: true },
        { name: `${betting.bet2.name}`, value: `${betting.bet2.sum.toLocaleString()}원(${Math.round(persent.bet2)}%) \n참여인원: ${betting.bet2.user.length.toLocaleString()}명 \n배율: ${Math.round(betting.times.bet1 * 100) / 100}배`, inline: true },
      );

    msg.channel.send({ embeds: [embed] });
  },
});