import { MessageEmbed } from 'discord.js';
import { Command } from '../../managers/Commands';

export default new Command({
  name: '랭킹',
  aliases: ['순위'],
  category: '도박',
  usage: '랭킹',
  description: '이 서버의 도박 순위를 확인합니다.',
  execute: async ({ msg, client }) => {
    const users = await client.models.gambling.find({ money: { $gt: 0 } }).sort({ money: -1 });
    const embed = new MessageEmbed()
      .setTitle('랭킹')
      .setDescription('유저의 돈 순위를 확인합니다.');
    for (const user of users) {
      embed.addField(user.name, `${user.money.toLocaleString()}원`, false);
    }
    msg.channel.send({ embeds: [embed] });
  },
});