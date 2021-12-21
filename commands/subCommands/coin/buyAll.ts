import { CommandType } from "../../../typings/command";
import { requestGet } from "../../../handler/function";
import { gambling } from "../../../models/gambling";
import { client } from "../../../clients/client";

export = <CommandType> {
  name: '풀매도',
  aliases: ['전부판매'],
  category: 'coin',
  execute: async ({msg, args}) => {
    const id = msg.author.id
    const user = await gambling.findOne({id})
    const stock = user.stock
    const coinName = args[1]
    const userCoin = stock.filter((element: { name: string }) => element.name == coinName)[0]
    const coin: any = await requestGet({ uri: `https://crix-api-endpoint.upbit.com/v1/crix/candles/days/?code=CRIX.UPBIT.${client.coin.get(coinName)}&count=1&to` })
    if (!coinName)
      return msg.reply('판매할 코인을 입력해주시기바랍니다.')
    if (!userCoin)
      return msg.reply('이 코인을 가지고 있지 않습니다.')
    const coinMoney = coin[0].tradePrice
    const count = userCoin.count
    const money = coinMoney * count

    const profit = Math.floor((coinMoney - userCoin.money) * count).toLocaleString()
    const profitShown = money < userCoin.money * count ? profit : '+' + profit

    const persent = Math.round((coinMoney / userCoin.money - 1) * 100 * 100) / 100
    const persentShown = persent < 0 ? persent : '+' + persent
    
    gambling.updateOne({id}, {$pull: {stock: userCoin}, $inc: {money: Math.round(money)}}).then(() => {
      msg.reply(`성공적으로 ${coinName} ${count.toLocaleString()}개를 ${money.toLocaleString()}원(개당 ${coinMoney}원)에 판매했습니다!\n손익: ${profitShown}원(${persentShown}%)`)
    })
  }
}