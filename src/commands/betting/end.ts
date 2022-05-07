import { Command } from '../../managers/Commands';

export default new Command({
  name: '베팅 종료',
  category: '베팅',
  usage: '베팅 종료 <팀>',
  description: '베팅을 종료합니다.',
  execute: async ({ msg, args, client }) => {
    const id = msg.guildId ?? ''
    const betting = client.betting.get(id)
    if (!betting)
      return msg.reply('아직 베팅을 시작하지 않았습니다.');

    const bet1 = betting.bet1;
    const bet2 = betting.bet2;
    const winner = args[0];
    if (winner != bet1.name && winner != bet2.name)
      return msg.reply(`${bet1.name}과 ${bet2.name}중 승리팀을 선택해주시기 바랍니다.`);

    switch (winner) {
      case bet1.name:
        betting.end('bet1');
        break;
      case bet2.name:
        betting.end('bet2');
        break;
    }

    msg.channel.send(`${winner}팀이 승리했습니다!`);
    client.betting.delete(id);
  },
});