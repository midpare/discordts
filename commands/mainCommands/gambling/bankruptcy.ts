import { Command } from '../../../contexts/commands';
import { gambling } from '../../../models/gambling';
import { dateCal } from '../../../handler/function';

export default new Command({
  name: '파산',
  category: 'gambling',
  usage: '파산',
  description: '모든 돈과 빚을 0원으로 만들고 3일간 도박을 하지 못합니다.',
  execute: async ({ msg, args }) => {
    const id = msg.author.id;
    const user = await gambling.findOne({ id });
    const date = new Date();
    const today = dateCal(date, 0);
    ;(await gambling.updateOne({ id }, { $set: { bankruptcy: today, money: 0, debt: 0 } })).matchedCount;
    msg.reply(`성공적으로 ${user.name}님이 파산했습니다!`);
  },
});