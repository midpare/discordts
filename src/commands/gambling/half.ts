import { Command } from '../../managers/Commands';

export default new Command({
  name: '하프',
  aliases: ['ㅎㅍ'],
  category: '도박',
  usage: '하프',
  description: '자신의 돈의 절반을 걸고 도박을 진행합니다. (성공시: 2배, 실패시: 0배)',
  execute: async ({ msg, client }) => {
    const id = msg.author.id;
    const user = await client.models.gambling.findOne({ id });

    if (user.money == 0)
      return msg.reply(client.messages.noneMoney);

    const money = Math.floor(user.money);
    const random = Math.floor(Math.random() * 2);

    if (random == 1) {
      (await client.models.gambling.updateOne({ id }, { $set: { money: Math.floor(money * 1.5) } })).matchedCount;
      msg.reply(client.messages.gambling.successGamb(user.money, Math.round(user.money * 0.5)))
    } else if (random == 0) {
      (await client.models.gambling.updateOne({ id }, { $set: { money: Math.floor(money * 0.5) } })).matchedCount;
      msg.reply(client.messages.gambling.failureGamb(user.money, Math.round(user.money * 0.5)));
    }
  },
});