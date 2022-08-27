import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { Command } from '../../managers/Command';

export default new Command({
  name: '랭킹',
  aliases: ['순위'],
  category: '도박',
  description: '이 서버의 도박 순위를 확인합니다.',
  options: [
    {
      name: '범위',
      description: '어디까지의 랭킹을 확인할지 선택합니다.',
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: '서버',
          value: 'server',
        },
        {
          name: '전체',
          value: 'all',
        },
      ],
    },
  ],
  execute: async ({ interaction, options, client }) => {
    const { guildId } = interaction
     
    const range = options.getString('범위');
    const embed = new EmbedBuilder()
    .setTitle('랭킹')
    .setDescription('유저의 돈 순위를 확인합니다.');
    if (range == 'server') {
      const users = await client.models.gambling.find({ money: { $gt: 0 }, guildId }).sort({ money: -1 });

      for (const user of users) {
        embed.addFields({ name: user.name, value: `${user.money.toLocaleString()}원`, inline: false });
      }
    } else if (range == 'all') {
      const users = await client.models.gambling.find({ money: { $gt: 0 } }).sort({ money: -1 });

      for (const user of users) {
        embed.addFields({ name: user.name, value: `${user.money.toLocaleString()}원`, inline: false });
      }
    }
    interaction.reply({ embeds: [embed] });
  },
});