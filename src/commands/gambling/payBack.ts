import { gambling } from '../../models/gambling';
import { Command } from '../../structures/Commands';

export default new Command({
  name: '빚갚기',
  aliases: ['돈갚기'],
  category: '도박',
  usage: '빚갚기 <돈>',
  description: '자신의 빚을 갚습니다.',
  execute: async ({ msg, args }) => {
    const id = msg.author.id;
    const user = await gambling.findOne({ id });

    const money = parseFloat(args[0]);
    if (!Number.isInteger(money) || money <= 0)
      return msg.reply('정확한 금액을 입력해주시기 바랍니다.');

    if (user.money < money)
      return msg.reply(`현재 잔액보다 높은 돈은 입력하실 수 없습니다. \n현재 잔액: ${user.money.toLocaleString()}원`);

    if (user.debt < money)
      return msg.reply(`갚으려는 금액이 현재 빚보다 많습니다.\n현재 빚: ${user.debt.toLocaleString()}원`);

    (await gambling.updateOne({ id }, { $inc: { money: -money, debt: -money, principalDebt: -money } })).matchedCount;
    msg.reply(`성공적으로 빚을 ${money.toLocaleString()}원 갚았습니다!\n현재 빚: ${user.debt.toLocaleString()}원 -> ${(user.debt - money).toLocaleString()}원`);
  },
}); 