import { gambling } from '../../models/gambling';
import { Command } from '../../structures/Commands';
import { messages } from '../../util/language/message';

export default new Command({
  name: '대출',
  category: '도박',
  usage: '대출 <돈>',
  description: '최대 100만원까지의 돈을 대출합니다.',
  execute: async ({ msg, args, client }) => {
    const id = msg.author.id;
    const user = await gambling.findOne({ id });

    const debt = parseFloat(args[0]);
    if (!Number.isInteger(debt) || debt <= 0)
      return msg.reply(messages.naturalNumber);

    if (user.debt + debt > 1000000)
      return msg.reply(messages.gambling.loan.overMoney);

    (await gambling.updateOne({ id }, { $inc: { principalDebt: debt, debt, money: debt } })).matchedCount;
    msg.reply(messages.gambling.loan.success(user.debt, debt));
  },
});