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
    if (!Number.isInteger(money) || money <= 0) {
      msg.reply(client.messages.naturalNumber);
      return;
    }

    if (user.money < money) {
      msg.reply(client.messages.overMoney(user.money));
      return;
    }

    if (user.debt < money) {
      msg.reply(client.messages.gambling.payBack.overMoney(user.debt));
      return;
    }

    (await client.models.gambling.updateOne({ id }, { $inc: { money: -money, debt: -money } })).matchedCount;
    msg.reply(client.messages.gambling.payBack.success(user.debt, money));
  },
}); 