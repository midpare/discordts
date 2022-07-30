import { SlashCommand } from '../../managers/SlashCommand';

export default new SlashCommand({
  name: '올인',
  aliases: ['ㅇㅇ'],
  category: '도박',
  description: '자신의 모든 돈을 걸고 도박을 진행합니다. (성공시: 2배, 실패시: 0배)',
  execute: async ({ interaction, client }) => {
    const id = interaction.user.id;
    const user = await client.models.gambling.findOne({ id });
    if (user.money <= 0) {
      interaction.reply(client.messages.noneMoney);
      return;
    }

    const random = Math.floor(Math.random() * 2);

    if (random == 1) {
      (await client.models.gambling.updateOne({ id }, { $mul: { money: 2 } })).matchedCount;
      interaction.reply(client.messages.gambling.successGamb(user.money, user.money));
    } else if (random == 0) {
      (await client.models.gambling.updateOne({ id }, { $set: { money: 0 } })).matchedCount;
      interaction.reply(client.messages.gambling.failureGamb(user.money, user.money));
    }
  },
});