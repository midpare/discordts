import { Command } from '../../structures/Commands';
import { client } from '../../structures/Client';

export default new Command({
  name: '베팅',
  category: '베팅',
  usage: '베팅',
  description: '베팅을 합니다.',
  execute: async ({ msg, args }) => {
    const guildId = msg.guildId ?? '';
    const money = parseFloat(args[1]);
    const betting = client.betting.get(guildId)

    if (!betting)
      return msg.reply('아직 베팅을 시작하지 않았습니다.');

    if (!money)
      return msg.reply('정확한 돈을 입력해주시기바랍니다.');

    if (!Number.isInteger(money) || money == 0)
      return msg.reply('정확한 정수를 입력해주시기바랍니다.');

    switch (args[0]) {
      case betting.bet1.name:
        betting.bet1.addUser(msg, msg.author, money);
        break;
      case betting.bet2.name:
        betting.bet2.addUser(msg, msg.author, money);
        break;
      default:
        return;
    }
  },
});