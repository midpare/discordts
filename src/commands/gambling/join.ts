import { gambling } from '../../models/gambling';
import { Command } from '../../managers/Commands';
import { messages } from '../../util/language/message';

export default new Command({
  name: '가입',
  category: '도박',
  usage: '가입',
  description: '도박 관련 명령어를 사용할수있게 가입을 합니다.',
  execute: async ({ msg, args, client }) => {
    const id = msg.author.id;
    const name = msg.author.username;
    const user = await gambling.findOne({ id });
    if (user)
      return msg.reply(messages.gambling.join.alreadyJoin);

    const newUser = new gambling({ id, name, stock: [] });
    await newUser.save();
    msg.reply(messages.gambling.join.success);
  },
}); 