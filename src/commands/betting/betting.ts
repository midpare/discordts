import { Command } from '../../structures/Commands';
import { Bet, bet1, bet2, betting } from '../../util/structures/Betting';
import { gambling } from '../../models/gambling';

export default new Command({
  name: '베팅',
  category: '베팅',
  usage: '베팅',
  description: '베팅을 합니다.',
  execute: async ({ msg, args }) => {
    if (!betting.betting)
      return msg.reply('아직 베팅을 시작하지 않았습니다.');
    if (args[0] != bet1.name && args[0] != bet2.name)
      return;

    const id = msg.author.id;
    const name = msg.author.username;

    switch (args[0]) {
      case bet1.name:
        bettingFunction(bet1);
        break;
      case bet2.name:
        bettingFunction(bet2);
        break;
    }

    async function bettingFunction(bet: Bet) {
      const money = parseFloat(args[1]);

      if (!money)
        return msg.reply('정확한 돈을 입력해주시기바랍니다.');

      if (!Number.isInteger(money) || money == 0)
        return msg.reply('정확한 정수를 입력해주시기바랍니다.');

      const user = await gambling.findOne({ id });

      if (money > user.money)
        return msg.reply(`자신의 돈보다 많은돈은 입력해실 수 없습니다. \n현재 잔액: ${user.money.toLocaleString()}원`);

      const posArr = bet.list.find((element: { id: string }) => element.id = id);
      if (!posArr) {
        bet.list.push({ id, money });
        msg.reply(`${name}님이 "${bet.name}"에 ${money.toLocaleString()}원을 베팅했습니다! \n현재잔액 ${user.money.toLocaleString()}원 -> ${(user.money - money).toLocaleString()}원`);
      } else {
        if (posArr.money + money < 0)
          return msg.reply(`베팅액보다 큰 금액을 뺄 수는 없습니다 \n현재 베팅액: ${posArr.money.toLocaleString()}`);
        posArr.money += money;
        msg.reply(`${name}님이 "${bet.name}"에 ${money.toLocaleString()}원을 추가로 베팅했습니다! \n현재 베팅액: ${(posArr.money - money).toLocaleString()}원 -> ${posArr.money.toLocaleString()}원 \n현재 잔액 ${user.money.toLocaleString()}원 -> ${(user.money - money).toLocaleString()}원`);
      }
      (await gambling.updateOne({ id }, { $inc: { money: - money } })).matchedCount;
    }
  },
});