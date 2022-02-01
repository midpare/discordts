import { gambling } from '../../models/gambling';
import { Command } from '../../structures/Commands';
import { message } from '../../util/language/message';

export default new Command({
  name: '도박',
  aliases: ['ㄷㅂ'],
  category: '도박',
  usage: '도박 <돈>',
  description: '자신의 <돈>을 걸고 도박을 진행합니다. (성공시: 2배, 실패시: 0배)',
  execute: async ({ msg, args }) => {
    const id = msg.author.id;
    const money = parseFloat(args[0]);

    if (!Number.isInteger(money) || money <= 0)
      return msg.reply(message.naturalNumber);

    const user = await gambling.findOne({ id });

    if (money > user.money)
      return msg.reply(message.overMoney(user.money));

    const random = Math.floor(Math.random() * 2);

    if (random == 1) {
      (await gambling.updateOne({ id }, { $inc: { money: money } })).matchedCount;
      msg.reply(message.gambling.successGamb(user.money, money));
    } else if (random == 0) {
      (await gambling.updateOne({ id }, { $inc: { money: -money } })).matchedCount;
      msg.reply(message.gambling.failureGamb(user.money, money));
    }
  },
});