import { gambling } from '../../models/gambling';
import { Command } from '../../structures/Commands';

export default new Command({
  name: '가입',
  category: '도박',
  usage: '가입',
  description: '도박 관련 명령어를 사용할수있게 가입을 합니다.',
  execute: async ({ msg, args }) => {
    const id = msg.author.id;
    const name = msg.author.username;
    const user = await gambling.findOne({ id });
    if (user)
      return msg.reply('이미 가입된 유저입니다.');

    const newUser = new gambling({ id, name });
    await newUser.save();
    msg.reply('성공적으로 가입이 완료되었습니다!');
  },
}); 