import { ApplicationCommandOptionType } from 'discord.js';
import { SlashCommand } from '../../managers/SlashCommand';

export default new SlashCommand({
  name: '빚갚기',
  aliases: ['돈갚기'],
  category: '도박',
  usage: '빚갚기 <돈>',
  description: '자신의 빚을 갚습니다.',
  options: [
    {
      name: '돈',
      description: '갚을 돈을 입력합니다.',
      required: true,
      type: ApplicationCommandOptionType.Integer,
      min_value: 1,
    },
  ],
  execute: async ({ interaction, options, client }) => {
    const id = interaction.user.id;
    const user = await client.models.gambling.findOne({ id });

    const money = options.getInteger('돈', true);

    if (user.money < money) {
      interaction.reply(client.messages.overMoney(user.money));
      return;
    }

    if (user.debt < money) {
      interaction.reply(client.messages.gambling.payBack.overMoney(user.debt));
      return;
    }

    (await client.models.gambling.updateOne({ id }, { $inc: { money: -money, debt: -money } })).matchedCount;
    interaction.reply(client.messages.gambling.payBack.success(user.debt, money));
  },
}); 