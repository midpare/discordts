import { ApplicationCommandOptionType } from 'discord.js';
import { SlashCommand } from '../../managers/SlashCommand';

export default new SlashCommand({
  name: '대출',
  category: '도박',
  usage: '대출 <돈>',
  description: '최대 100만원까지의 돈을 대출합니다.',
  options: [
    {
      name: '돈',
      description: '대출할 돈을 입력합니다.',
      required: true,
      type: ApplicationCommandOptionType.Integer,
      min_value: 1
    },
  ],
  execute: async ({ interaction, options, client }) => {
    const id = interaction.user.id;
    const user = await client.models.gambling.findOne({ id });
    const debt = options.getInteger('돈', true);

    if (user.debt + debt > 1000000) {
      interaction.reply(client.messages.gambling.loan.overMoney);
      return;
    }

    (await client.models.gambling.updateOne({ id }, { $inc: { debt, money: debt } })).matchedCount;
    interaction.reply(client.messages.gambling.loan.success(user.debt, debt));
  },
});