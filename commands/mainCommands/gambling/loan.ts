import { gambling } from '../../../models/gambling';
import { Command } from '../../../structures/Commands';

export default new Command({
  name: '대출',
  category: '도박',
  usage: '대출 <돈>',
  description: '최대 100만원까지의 돈을 대출합니다.',
  execute: async ({ msg, args }) => {
    const id = msg.author.id;
    const user = await gambling.findOne({ id });
    if (!args[0])
      return msg.reply('정확한 금액을 입력해주시기바랍니다.');
    const debt = parseFloat(args[0]);
    if (!Number.isInteger(debt) || debt <= 0)
      return msg.reply('정확한 금액를 입력해주시기바랍니다');

    if (user.debt + debt > 1000000)
      return msg.reply(`100만원을 초과하는 빚은 빌릴수 없습니다.`);

    (await gambling.updateOne({ id }, { $inc: { principalDebt: debt, debt, money: debt } })).matchedCount;
    msg.reply(`성공적으로 ${debt.toLocaleString()}원을 대출했습니다!\n 현재 대출금액 ${user.debt.toLocaleString()}원 -> ${(user.debt + debt).toLocaleString()}원`);
  },
});