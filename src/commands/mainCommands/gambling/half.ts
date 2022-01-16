import { gambling } from '../../../models/gambling';
import { Command } from '../../../structures/Commands';

export default new Command({
  name: '하프',
  category: '도박',
  usage: '하프',
  description: '자신의 돈의 절반을 걸고 도박을 진행합니다. (성공시: 2배, 실패시: 0배)',
  execute: async ({ msg, args }) => {
    const id = msg.author.id;
    const user = await gambling.findOne({ id });

    if (user.money == 0)
      return msg.reply('돈이 없을때는 도박을 할 수 없습니다.');

    const money = Math.floor(user.money);
    const random = Math.floor(Math.random() * 2);

    if (random == 1) {
      (await gambling.updateOne({ id }, { $set: { money: Math.floor(money * 1.5) } })).matchedCount;
      msg.reply(`도박에 성공하셨습니다! ${Math.round(user.money * 0.5).toLocaleString()}원이 지급되었습니다. \n현재 잔액: ${user.money.toLocaleString()}원 -> ${Math.round(user.money * 1.5).toLocaleString()}원`);
    } else if (random == 0) {
      (await gambling.updateOne({ id }, { $set: { money: Math.floor(money * 0.5) } })).matchedCount;
      msg.reply(`도박에 실패하셨습니다! ${Math.round(user.money * 0.5).toLocaleString()}원이 차감되었습니다. \n현재 잔액: ${user.money.toLocaleString()}원 -> ${Math.round(user.money * 0.5).toLocaleString()}원`);
    }
  },
});