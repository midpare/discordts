import { Command } from '../../managers/Command';
import { Utils } from '../../structures/Utils';

export default new Command({
  name: '올인',
  aliases: ['ㅇㅇ'],
  category: '도박',
  description: '자신의 모든 돈을 걸고 도박을 진행합니다. (성공시: 2배, 실패시: 0배)',
  execute: async ({ interaction, client }) => {
    const { user: { id }, guildId } = interaction
    const user = await client.models.gambling.findOne({ id, guildId });
    if (user.money <= 0) {
      Utils.reply(interaction, client.messages.noneMoney);
      return 0;
    }

    const random = Math.floor(Math.random() * 2);

    if (random == 1) {
      (await client.models.gambling.updateOne({ id, guildId }, { $mul: { money: 2 } })).matchedCount;
      interaction.reply(client.messages.gambling.successGamb(user.money, user.money));
    } else if (random == 0) {
      (await client.models.gambling.updateOne({ id, guildId }, { $set: { money: 0 } })).matchedCount;
      interaction.reply(client.messages.gambling.failureGamb(user.money, user.money));
    }
    return 1;
  },
});