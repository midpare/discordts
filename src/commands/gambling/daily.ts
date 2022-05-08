import { gambling } from '../../models/gambling';
import { Command } from '../../managers/Commands';

export default new Command({
  name: '출석체크',
  aliases: ['출첵', 'ㅊㅊ'],
  category: '도박',
  usage: '출석체크',
  description: '하루에 한번 50,000 ~ 100,000만원의 돈을 획득합니다.',
  execute: async ({ msg, args, client }) => {
    const id = msg.author.id;
    const user = await gambling.findOne({ id });

    const date = new Date();
    const today = '' + date.getFullYear() + date.getMonth() + date.getDate();

    if (user.date == today)
      return msg.reply(client.messages.gambling.daily.today);

    const money = Math.floor(Math.random() * 50000 + 50000);
    (await gambling.updateOne({ id }, { $inc: { money }, $set: { date: today } })).matchedCount;
    msg.reply(client.messages.gambling.daily.success(user.money, money));
  },
});