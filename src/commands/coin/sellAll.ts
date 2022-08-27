import { Utils } from '../../structures/Utils';
import { ApplicationCommandOptionType } from 'discord.js';
import { Command } from '../../managers/Command';

export default new Command({
  name: '코인풀매도',
  category: '코인',
  usage: '코인풀매도 <코인이름>',
  description: '현재 갖고있는 코인을 전부 판매합니다.',
  options: [
    {
      name: '이름',
      description: '판매할 코인의 이름을 입력합니다.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  execute: async ({ interaction, options, client }) => {
    const { guildId, user: { id } } = interaction;
    const user = await client.models.gambling.findOne({ id, guildId });
    const stock = user.stock;
    const coinName = options.getString('이름', true);
    const userCoin = stock.filter((element: { name: string }) => element.name == coinName)[0];

    const coinId = client.coin.get(coinName)
    if (!coinId) {
      Utils.reply(interaction, '정확한 코인을 입력해주시기바랍니다.');
      return;
    }

    const apiOptions = {
      uri: `https://crix-api-endpoint.upbit.com/v1/crix/candles/days/?code=CRIX.UPBIT.${coinId}&count=1&to`,
      method: 'GET',
      json: true,
    };
    
    const coin = await Utils.request(apiOptions);

    if (!coin) {
      Utils.reply(interaction, '정확한 코인을 입력해주시기바랍니다.');
      return;
    }

    if (!userCoin) {
      Utils.reply(interaction, '이 코인을 가지고 있지 않습니다.');
      return;
    }

    const coinMoney = coin[0].tradePrice;
    const count = userCoin.count;
    const money = coinMoney * count;

    const profit = Math.floor((coinMoney - userCoin.money) * count).toLocaleString();
    const profitShown = money < userCoin.money * count ? profit : '+' + profit;

    const persent = Math.round((coinMoney / userCoin.money - 1) * 100 * 100) / 100;
    const persentShown = persent < 0 ? persent : '+' + persent;

    (await client.models.gambling.updateOne({ id, guildId }, { $pull: { stock: userCoin }, $inc: { money: Math.round(money) } })).matchedCount;
    interaction.reply(`성공적으로 ${coinName} ${count.toLocaleString()}개를 ${money.toLocaleString()}원(개당 ${coinMoney}원)에 판매했습니다!\n손익: ${profitShown}원(${persentShown}%)`);
  },
});