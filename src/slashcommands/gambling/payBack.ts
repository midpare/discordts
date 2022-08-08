import { ApplicationCommandOptionType } from 'discord.js';
import { Command } from '../../managers/Command';
import { Utils } from '../../structures/Utils';

export default new Command({
  name: '빚갚기',
  aliases: ['돈갚기'],
  category: '도박',
  usage: '빚갚기 <돈>',
  description: '자신의 빚을 갚습니다.',
  options: [
    {
      name: '돈',
      description: '갚을 돈을 입력합니다.',
      type: ApplicationCommandOptionType.Integer,
      required: true,
      min_value: 1,
    },
  ],
  execute: async ({ interaction, options, client }) => {
    const { guildId, user: { id } } = interaction;
    const user = await client.models.gambling.findOne({ id, guildId });

    const money = options.getInteger('돈', true);

    if (user.money < money) {
      Utils.reply(interaction, client.messages.overMoney(user.money));
      return;
    }

    if (user.debt < money) {
      Utils.reply(interaction, client.messages.gambling.payBack.overMoney(user.debt));
      return;
    }

    (await client.models.gambling.updateOne({ id, guildId }, { $inc: { money: -money, debt: -money } })).matchedCount;
    interaction.reply(client.messages.gambling.payBack.success(user.debt, money));
  },
}); 