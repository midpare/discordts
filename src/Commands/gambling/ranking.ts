import { EmbedBuilder } from 'discord.js';
import { Command } from '../../managers/Command';

export default new Command({
  name: '랭킹',
  aliases: ['순위'],
  category: '도박',
  description: '이 서버의 도박 순위를 확인합니다.',
  execute: async ({ interaction, client }) => {
    const users = await client.models.gambling.find({ money: { $gt: 0 } }).sort({ money: -1 });
    const embed = new EmbedBuilder()
      .setTitle('랭킹')
      .setDescription('유저의 돈 순위를 확인합니다.');
    for (const user of users) {
      embed.addFields({ name: user.name, value: `${user.money.toLocaleString()}원`, inline: false });
    }
    interaction.channel?.send({ embeds: [embed] });
  },
});