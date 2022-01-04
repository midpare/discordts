import { gambling } from '../../../models/gambling';
import { Command } from '../../../contexts/commands';

export default new Command({
  name: '잔액',
  aliases: ['돈', '보유금액'],
  category: 'gambling',
  usage: '잔액',
  description: '자신의 현재 잔액을 확인합니다.',
  execute: async ({ msg, args }) => {
    const id = msg.author.id;
    const user = await gambling.findOne({ id });
    msg.reply(`${user.name} 님의 잔액은 ${user.money.toLocaleString()}원입니다.`);
  },
});