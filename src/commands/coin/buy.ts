import { Command } from '../../managers/Commands';
import { gambling } from '../../models/gambling';
import { Utils } from '../../structures/Utils';

export default new Command({
  name: '코인 구매',
  aliases: ['코인 매수'],
  category: '코인',
  usage: '코인 구매 <코인이름> <구매수량>',
  description: '현재 코인의 시세로 코인을 구매합니다.',
  execute: async ({ msg, args, client }) => {
    const id = msg.author.id;
    const user = await gambling.findOne({ id });
    const stock = user.stock;
    const coinName = args[0];
    const userCoin = stock.filter((element: { name: string }) => element.name == coinName)[0];
    const apiOptions = {
      uri: `https://crix-api-endpoint.upbit.com/v1/crix/candles/days/?code=CRIX.UPBIT.${client.coin.get(coinName)}&count=1&to`,
      method: 'GET',
      json: true,
    };
    const coin = await Utils.requestGet(apiOptions);
    if (!coin)
      return msg.reply('정확한 코인을 입력해주시기바랍니다.');
    const count = parseFloat(args[1]);
    if (!Number.isInteger(count) || count <= 0)
      return msg.reply('정확한 구매 수량을 입력해주시기바랍니다.');
    const coinMoney = coin[0].tradePrice;
    const wholeMoney = coinMoney * count;
    if (user.money < wholeMoney)
      return msg.reply(`현재 잔액보다 사려는 수량이 많습니다. \n현재 잔액: ${user.money.toLocaleString()}원\n사려는 금액: ${wholeMoney.toLocaleString()}원(개당 ${coinMoney.toLocaleString()}원)`);

    if (userCoin) {
      const moneyAve = (userCoin.money * userCoin.count + wholeMoney) / (userCoin.count + count);
      gambling.updateOne({ id, stock: userCoin }, { $set: { 'stock.$.money': moneyAve }, $inc: { 'stock.$.count': count, money: Math.round(-wholeMoney) } });
      msg.reply(`성공적으로 ${coinName} ${count.toLocaleString()}개를 ${wholeMoney.toLocaleString()}원(개당 ${coinMoney.toLocaleString()}원)에 추가로 구매했습니다!\n현재 평단가: ${userCoin.money.toLocaleString()}원 -> ${(Math.floor(moneyAve * 100) / 100).toLocaleString()}원\n현재 구매량: ${userCoin.count}개 -> ${(userCoin.count + count).toLocaleString()}개`);
    } else {
      const stockObject = {
        name: coinName,
        count: count,
        money: coinMoney,
      };
      (await gambling.updateOne({ id }, { $push: { stock: stockObject }, $inc: { money: Math.round(-wholeMoney) } })).matchedCount;     
      msg.reply(`성공적으로 ${coinName} ${count.toLocaleString()}개를 ${wholeMoney.toLocaleString()}원(개당 ${coinMoney.toLocaleString()}원)에 구매했습니다!`);
    }
  },
})