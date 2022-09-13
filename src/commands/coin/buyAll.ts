import { Command } from '../../managers/Command';
import { Utils } from '../../structures/Utils';
import { ApplicationCommandOptionType } from 'discord.js';

export default new Command({
  name: '코인풀매수',
  aliases: ['코인전부구매'],
  category: '코인',
  usage: '코인풀매수 <코인이름>',
  description: '갖고있는 모든 돈으로 코인을 구매합니다.',
  options: [
    {
      name: '이름',
      description: '구매할 코인의 이름을 입력합니다.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  execute: async ({ interaction, options, client }) => {
    const { guildId, user: { id } } = interaction;
    const user = await client.models.gambling.findOne({ id, guildId });
    const coinName = options.getString('이름', true);
    const userCoin = user.coin.filter((element: { name: string }) => element.name == coinName)[0];

    const coinId = client.coin.get(coinName)
    if (!coinId) {
      Utils.reply(interaction, '정확한 코인을 입력해주시기바랍니다.');
      return 0;
    }
    const apiOptions = {
      uri: `https://crix-api-endpoint.upbit.com/v1/crix/candles/days/?code=CRIX.UPBIT.${coinId}&count=1&to`,
      method: 'GET',
      json: true,
    };

    
    const coin = await Utils.request(apiOptions);

    const coinMoney = coin[0].tradePrice;
    const count = Math.floor(user.money / coinMoney);
    const money = coinMoney * count;
    if (userCoin) {
      const moneyAve = (userCoin.money * userCoin.count + money) / (userCoin.count + count);
      (await client.models.gambling.updateOne({ id, guildId, coin: userCoin }, { $set: { 'coin.$.money': moneyAve }, $inc: { 'coin.$.count': count, money: Math.round(-money) } })).matchedCount;
      interaction.reply(`성공적으로 ${coinName} ${count.toLocaleString()}개를 ${money.toLocaleString()}원(개당 ${coinMoney.toLocaleString()}원)에 추가로 구매했습니다!\n현재 평단가: ${userCoin.money.toLocaleString()}원 -> ${(Math.floor(moneyAve * 100) / 100).toLocaleString()}원\n현재 구매량: ${userCoin.count}개 -> ${(userCoin.count + count).toLocaleString()}개`);
    } else {
      const coinObject = {
        name: coinName,
        count: count,
        money: coinMoney,
      };
      (await client.models.gambling.updateOne({ id, guildId }, { $push: { coin: coinObject }, $inc: { money: Math.round(-money) } })).matchedCount;
      interaction.reply(`성공적으로 ${coinName} ${count.toLocaleString()}개를 ${(money).toLocaleString()}원(개당 ${coinMoney.toLocaleString()}원)에 구매했습니다!`);
    }
    return 1;
  },
});