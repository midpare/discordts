import { gambling } from '../../models/gambling';
import { Command } from '../../structures/Commands';
import { messages } from '../../util/language/message';

export default new Command({
  name: '빚',
  category: '도박',
  usage: '빚',
  description: '자신의 현재 빚을 확인합니다.',
  execute: async ({ msg, args }) => {
    const id = msg.author.id;
    const user = await gambling.findOne({ id });
    msg.reply(messages.gambling.debt(user.name, user.debt));
  },
});