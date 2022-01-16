import { Command } from '../../../structures/Commands';
import { gambling } from '../../../models/gambling';
import { Bet, bet1, bet2, betting } from '../../../structures/game/Betting';

export default new Command({
  name: '종료',
  category: '베팅',
  usage: '베팅 종료 <팀>',
  description: '베팅을 종료합니다.',
  execute: async ({ msg, args }) => {
    if (!betting.betting)
      return msg.reply('아직 베팅을 시작하지 않았습니다.');

    const winner = args[1];
    if (winner != bet1.name && winner != bet2.name)
      return msg.reply(`${bet1.name}과 ${bet2.name}중 승리팀을 선택해주시기 바랍니다.`);

    switch (winner) {
      case bet1.name:
        result(bet1);
        break;
      case bet2.name:
        result(bet2);
        break;
    }

    async function result(bet: Bet) {
      msg.reply(`${bet.name}팀이 승리했습니다!`);

      for (const user of bet.list) {
        const id = user.id;
        const moneyResult = user.money * bet.times;
        (await gambling.updateOne({ id }, { $inc: { money: moneyResult } })).matchedCount;
      }
    }
    
    bet1.list = [];
    bet2.list = [];
    betting.betting = false;
  },
});