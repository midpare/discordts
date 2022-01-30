import { gambling } from '../../models/gambling';
import { Command } from '../../structures/Commands';

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
      return msg.reply('정확한 금액를 입력해주시기 바랍니다.');

    const user = await gambling.findOne({ id });

    if (money > user.money)
      return msg.reply(`현재 잔액보다 높은 돈은 입력하실 수 없습니다. \n현재 잔액: ${user.money.toLocaleString()}원`);

    const random = Math.floor(Math.random() * 2);

    if (random == 1) {
      (await gambling.updateOne({ id }, { $inc: { money: money } })).matchedCount;
      msg.reply(`도박에 성공하셨습니다! ${money.toLocaleString()}원이 지급되었습니다. \n현재 잔액: ${user.money.toLocaleString()}원 -> ${(user.money + money).toLocaleString()}원`);
    } else if (random == 0) {
      (await gambling.updateOne({ id }, { $inc: { money: -money } })).matchedCount;
      msg.reply(`도박에 실패하셨습니다! ${money.toLocaleString()}원이 차감되었습니다. \n현재 잔액: ${user.money.toLocaleString()}원 -> ${(user.money - money).toLocaleString()}원`);
    }
  },
});