import { gambling } from '../../../models/gambling';
import { Command } from '../../../structures/Commands';

export default new Command({
  name: '올인',
  aliases: ['allIn'],
  category: '도박',
  usage: '올인',
  description: '자신의 모든 돈을 걸고 도박을 진행합니다. (성공시: 2배, 실패시: 0배)',
  execute: async ({ msg, args }) => {
    const id = msg.author.id;
    const user = await gambling.findOne({ id });
    if (user.money == 0)
      return msg.reply('돈이 없을때는 도박을 할 수 없습니다.');

    const random = Math.floor(Math.random() * 2);

    if (random == 1) {
      (await gambling.updateOne({ id }, { $mul: { money: 2 } })).matchedCount;
      msg.reply(`도박에 성공하셨습니다! ${user.money.toLocaleString()}원이 지급되었습니다. \n현재 잔액: ${user.money.toLocaleString()}원 -> ${(user.money * 2).toLocaleString()}원`);
    } else if (random == 0) {
      (await gambling.updateOne({ id }, { $set: { money: 0 } })).matchedCount;
      msg.reply(`도박에 실패하셨습니다! 모든 돈을 잃었습니다. \n현재 잔액 ${user.money.toLocaleString()}원 -> 0원`);
    }
  },
});