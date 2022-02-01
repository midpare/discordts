import { gambling } from '../../models/gambling';
import { Command } from '../../structures/Commands';
import { message } from '../../util/language/message';

export default new Command({
  name: '잔액',
  aliases: ['ㅈㅇ', '보유금액'],
  category: '도박',
  usage: '잔액',
  description: '자신의 현재 잔액을 확인합니다.',
  execute: async ({ msg, args }) => {
    const id = msg.author.id;
    const user = await gambling.findOne({ id });
    msg.reply(message.gambling.balance(user.name, user.money));
  },
});