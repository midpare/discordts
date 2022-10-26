import { Command } from '../../managers/Command';
import { Utils } from '../../structures/Utils';

export default new Command({
  name: '하프',
  aliases: ['ㅎㅍ'],
  category: '도박',
  description: '자신의 돈의 절반을 걸고 도박을 진행합니다. (성공시: 2배, 실패시: 0배)',
  execute: async ({ interaction, client }) => {
    const { guildId, user: { id } } = interaction;
    const user = await client.models.gambling.findOne({ id, guildId });

    if (user.money == 0) {
      Utils.reply(interaction, client.messages.noneMoney);
      return 0;
    }

    const money = Math.floor(user.money);
    const random = Math.floor(Math.random() * 2);

    if (random == 1) {
      (await client.models.gambling.updateOne({ id, guildId }, { $set: { money: Math.floor(money * 1.5) } })).matchedCount;
      interaction.reply(client.messages.gambling.successGamb(user.money, Math.round(user.money * 0.5)))
    } else if (random == 0) {
      (await client.models.gambling.updateOne({ id, guildId }, { $set: { money: Math.floor(money * 0.5) } })).matchedCount;
      interaction.reply(client.messages.gambling.failureGamb(user.money, Math.round(user.money * 0.5)));
    }
    return 1;
  },
});