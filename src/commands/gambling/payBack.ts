import { gambling } from '../../models/gambling';
import { Command } from '../../managers/Commands';

export default new Command({
  name: '빚갚기',
  aliases: ['돈갚기'],
  category: '도박',
  usage: '빚갚기 <돈>',
  description: '자신의 빚을 갚습니다.',
  execute: async ({ msg, args, client }) => {
    const id = msg.author.id;
    const user = await client.models.gambling.findOne({ id });

    const money = parseFloat(args[0]);
    if (!Number.isInteger(money) || money <= 0)
      return msg.reply(client.messages.naturalNumber);

    if (user.money < money)
      return msg.reply(client.messages.overMoney(user.money));

    if (user.debt < money)
      return msg.reply(client.messages.gambling.payBack.overMoney(user.debt));

    (await client.models.gambling.updateOne({ id }, { $inc: { money: -money, debt: -money, principalDebt: -money } })).matchedCount;
    msg.reply(client.messages.gambling.payBack.success(user.debt, money));
  },
}); 