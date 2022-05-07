import { gambling } from '../../models/gambling';
import { Command } from '../../managers/Commands';
import { messages } from '../../util/language/message';

export default new Command({
  name: '잔액',
  aliases: ['ㅈㅇ', '보유금액'],
  category: '도박',
  usage: '잔액',
  description: '자신의 현재 잔액을 확인합니다.',
  execute: async ({ msg, args, client }) => {
    const id = msg.author.id;
    const user = await gambling.findOne({ id });
    msg.reply(messages.gambling.balance(user.name, user.money));
  },
});