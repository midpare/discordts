import { Command } from '../../../structures/Commands';
import { gambling } from '../../../models/gambling';

export default new Command({
  name: '파산',
  category: '도박',
  usage: '파산',
  description: '모든 돈과 빚을 0원으로 만들고 3일간 도박을 하지 못합니다.',
  execute: async ({ msg, args }) => {
    const id = msg.author.id;
    const user = await gambling.findOne({ id });

    const date = new Date();
    const today = '' + date.getFullYear() + date.getMonth() + date.getDate();
    
    (await gambling.updateOne({ id }, { $set: { bankruptcy: parseFloat(today), money: 0, debt: 0, principalDebt: 0, stock: [] } })).matchedCount;
    msg.reply(`성공적으로 ${user.name}님이 파산했습니다!`);
  },
});