import { Command } from '../../managers/Commands';

export default new Command({
  name: '잔액',
  aliases: ['ㅈㅇ', '보유금액'],
  category: '도박',
  usage: '잔액',
  description: '자신의 현재 잔액을 확인합니다.',
  execute: async ({ msg, client }) => {
    const id = msg.author.id;
    const user = await client.models.gambling.findOne({ id });
    msg.reply(client.messages.gambling.balance(user.name, user.money));
  },
});