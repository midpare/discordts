import { Command } from '../../managers/Command';
import { Utils } from '../../structures/Utils';
import { ApplicationCommandOptionType } from 'discord.js';

export default new Command({
  name: '코인매도',
  aliases: ['코인판매'],
  category: '코인',
  usage: '코인매도 <코인이름> <판매수량>',
  description: '현재 코인의 시세로 코인을 판매합니다.',
  options: [
    {
      name: '이름',
      description: '판매할 코인의 이름을 입력합니다.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: '수량',
      description: '판매할 코인의 수량을 입력합니다.',
      type: ApplicationCommandOptionType.Integer,
      required: true,
      min_value: 1,
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

    if (!coin) {
      Utils.reply(interaction, '정확한 코인을 입력해주시기바랍니다.');
      return 0;
    }

    if (!userCoin) {
      Utils.reply(interaction, '이 코인을 가지고 있지 않습니다.');
      return 0;
    }

    const count = options.getInteger('수량', true);

    if (userCoin.count < count) {
      Utils.reply(interaction, `파려는 코인의 개수가 현재 코인개수보다 많습니다.\n현재 개수: ${userCoin.count}개`);
      return 0;
    }

    const coinMoney = coin[0].tradePrice;
    const money = coinMoney * count;

    const profit = Math.floor((coinMoney - userCoin.money) * count).toLocaleString();
    const profitShown = money < userCoin.money * count ? profit : '+' + profit;

    const persent = Math.round((coinMoney / userCoin.money - 1) * 100 * 100) / 100;
    const persentShown = persent < 0 ? persent : '+' + persent;

    if (userCoin.count == count) {
      (await client.models.gambling.updateOne({ id, guildId }, { $pull: { coin: userCoin }, $inc: { money: Math.round(money) } })).matchedCount;
    } else {
      (await client.models.gambling.updateOne({ id, guildId, coin: userCoin }, { $inc: { 'coin.$.count': -count, money: Math.round(money) } })).matchedCount
    }

    interaction.reply(`성공적으로 ${coinName} ${count.toLocaleString()}개를 ${money.toLocaleString()}원(개당 ${coinMoney}원)에 판매했습니다!\n현재 코인개수: ${userCoin.count}개 -> ${userCoin.count - count}개\n손익: ${profitShown}원(${persentShown}%)`);
    return 1;
  },
});