import { Command } from '../../managers/Commands';

export default new Command({
  name: '빚',
  category: '도박',
  usage: '빚',
  description: '자신의 현재 빚을 확인합니다.',
  execute: async ({ msg, client }) => {
    const id = msg.author.id;
    const user = await client.models.gambling.findOne({ id });
    msg.reply(client.messages.gambling.debt(user.name, user.debt));
  },
});