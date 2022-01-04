import { gambling } from '../../../models/gambling';
import { Command } from '../../../contexts/commands';

export default new Command({
  name: '빚',
  category: 'gambling',
  usage: '빚',
  description: '자신의 현재 빚을 확인합니다.',
  execute: async ({ msg, args }) => {
    const id = msg.author.id;
    const user = await gambling.findOne({ id });
    msg.reply(`${user.name} 님의 빚은 ${user.debt.toLocaleString()}원입니다.`);
  },
});