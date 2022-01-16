import { gambling } from '../../../models/gambling';
import { Command } from '../../../structures/Commands';

export default new Command({
  name: '출석체크',
  category: '도박',
  usage: '출석체크',
  description: '하루에 한번 50,000 ~ 100,000만원의 돈을 획득합니다.',
  execute: async ({ msg, args }) => {
    const id = msg.author.id;
    const user = await gambling.findOne({ id });

    const date = new Date();
    const today = '' + date.getFullYear() + date.getMonth() + date.getDate();

    if (user.date == today)
      return msg.reply('오늘은 이미 받았습니다.');

    const money = Math.floor(Math.random() * 50000 + 50000);
    (await gambling.updateOne({ id }, { $inc: { money }, $set: { date: today } })).matchedCount;
    msg.reply(`${money.toLocaleString()}원이 지급됐습니다!\n${user.name}님의 현재 잔액은 ${user.money.toLocaleString()}원 -> ${(user.money + money).toLocaleString()} 원입니다.`);
  },
});