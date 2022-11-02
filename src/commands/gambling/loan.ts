import { ApplicationCommandOptionType } from 'discord.js';
import { Command } from '../../managers/Command';
import { Utils } from '../../structures/Utils';

export default new Command({
  name: '대출',
  category: '도박',
  usage: '대출 <돈>',
  description: '최대 100만원까지의 돈을 대출합니다.',
  options: [
    {
      name: '돈',
      description: '대출할 돈을 입력합니다.',
      type: ApplicationCommandOptionType.Integer,
      required: true,
      min_value: 1
    },
  ],
  execute: async ({ interaction, options, client }) => {
    const { guildId, user: { id } } = interaction;
    const user = await client.models.gambling.findOne({ id, guildId });
    const debt = options.getInteger('돈', true);

    if (user.debt + debt > 1000000) {
      Utils.reply(interaction, client.messages.gambling.loan.overMoney(user.debt));
      return 0;
    }

    (await client.models.gambling.updateOne({ id, guildId }, { $inc: { debt, money: debt } })).matchedCount;
    interaction.reply(client.messages.gambling.loan.success(user.debt, debt));
    return 1;
  },
});