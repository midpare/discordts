import { gambling } from '../../models/gambling';
import { Command } from '../../structures/Commands';
import { messages } from '../../util/language/message';

export default new Command({
  name: '빚갚기',
  aliases: ['돈갚기'],
  category: '도박',
  usage: '빚갚기 <돈>',
  description: '자신의 빚을 갚습니다.',
  execute: async ({ msg, args, client }) => {
    const id = msg.author.id;
    const user = await gambling.findOne({ id });

    const money = parseFloat(args[0]);
    if (!Number.isInteger(money) || money <= 0)
      return msg.reply(messages.naturalNumber);

    if (user.money < money)
      return msg.reply(messages.overMoney(user.money));

    if (user.debt < money)
      return msg.reply(messages.gambling.payBack.overMoney(user.debt));

    (await gambling.updateOne({ id }, { $inc: { money: -money, debt: -money, principalDebt: -money } })).matchedCount;
    msg.reply(messages.gambling.payBack.success(user.debt, money));
  },
}); 