import { ApplicationCommandOptionType } from 'discord.js';
import { Command } from '../../managers/Command';
import { Utils } from '../../structures/Utils';

export default new Command({
  name: '도박',
  aliases: ['ㄷㅂ'],
  category: '도박',
  usage: '도박 <돈>',
  description: '자신의 <돈>을 걸고 도박을 진행합니다. (성공시: 2배, 실패시: 0배)',
  options: [
    {
      name: '돈',
      description: '도박할 돈을 입력합니다.',
      type: ApplicationCommandOptionType.Integer,
      required: true,
      min_value: 1,
    },
  ],
  execute: async ({ interaction, options, client }) => {
    const { guildId, user: { id } } = interaction;
    const money = options.getInteger('돈', true);

    const user = await client.models.gambling.findOne({ id, guildId });

    if (money > user.money) {
      Utils.reply(interaction, client.messages.overMoney(user.money));
      return 0;
    }

    const random = Math.floor(Math.random() * 2);

    if (random == 1) {
      (await client.models.gambling.updateOne({ id, guildId }, { $inc: { money: money } })).matchedCount;
      interaction.reply(client.messages.gambling.successGamb(user.money, money));
    } else if (random == 0) {
      (await client.models.gambling.updateOne({ id, guildId }, { $inc: { money: -money } })).matchedCount;
      interaction.reply(client.messages.gambling.failureGamb(user.money, money));
    }
    return 1;
  },
});