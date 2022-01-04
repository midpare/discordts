import { MessageEmbed } from 'discord.js';
import { gambling } from '../../../models/gambling';
import { Command } from '../../../contexts/commands';

export default new Command({
  name: '랭킹',
  aliases: ['순위'],
  category: 'gambling',
  usage: '랭킹',
  description: '이 서버의 도박 순위를 확인합니다.',
  execute: async ({ msg, args }) => {
    const users = await gambling.find({ money: { $gt: 0 } }).sort({ money: -1 });
    const embed = new MessageEmbed()
      .setTitle('랭킹')
      .setDescription('유저의 돈 순위를 확인합니다.');
    users.forEach((element) => {
      embed.addField(element.name, `${element.money.toLocaleString()}원`, false);
    });
    msg.channel.send({ embeds: [embed] });
  },
});