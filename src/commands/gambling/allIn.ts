import { gambling } from '../../models/gambling';
import { Command } from '../../managers/Commands';
import { messages } from '../../util/language/message';

export default new Command({
  name: '올인',
  aliases: ['ㅇㅇ'],
  category: '도박',
  usage: '올인',
  description: '자신의 모든 돈을 걸고 도박을 진행합니다. (성공시: 2배, 실패시: 0배)',
  execute: async ({ msg, args, client }) => {
    const id = msg.author.id;
    const user = await gambling.findOne({ id });
    if (user.money <= 0)
      return msg.reply(messages.noneMoney);

    const random = Math.floor(Math.random() * 2);

    if (random == 1) {
      (await gambling.updateOne({ id }, { $mul: { money: 2 } })).matchedCount;
      msg.reply(messages.gambling.successGamb(user.money, user.money));
    } else if (random == 0) {
      (await gambling.updateOne({ id }, { $set: { money: 0 } })).matchedCount;
      msg.reply(messages.gambling.failureGamb(user.money, user.money));
    }
  },
});