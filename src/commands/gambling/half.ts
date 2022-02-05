import { gambling } from '../../models/gambling';
import { Command } from '../../structures/Commands';
import { messages } from '../../util/language/message';

export default new Command({
  name: '하프',
  aliases: ['ㅎㅍ'],
  category: '도박',
  usage: '하프',
  description: '자신의 돈의 절반을 걸고 도박을 진행합니다. (성공시: 2배, 실패시: 0배)',
  execute: async ({ msg, args }) => {
    const id = msg.author.id;
    const user = await gambling.findOne({ id });

    if (user.money == 0)
      return msg.reply(messages.noneMoney);

    const money = Math.floor(user.money);
    const random = Math.floor(Math.random() * 2);

    if (random == 1) {
      (await gambling.updateOne({ id }, { $set: { money: Math.floor(money * 1.5) } })).matchedCount;
      msg.reply(messages.gambling.successGamb(user.money, Math.round(user.money * 0.5)))
    } else if (random == 0) {
      (await gambling.updateOne({ id }, { $set: { money: Math.floor(money * 0.5) } })).matchedCount;
      msg.reply(messages.gambling.failureGamb(user.money, Math.round(user.money * 0.5)));
    }
  },
});