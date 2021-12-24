import { CommandType } from "../../../typings/command";
import { gambling } from '../../../models/gambling'
import { client } from '../../../contexts/client'
import { requestGet } from "../../../handler/function";

export = <CommandType> {
  name: '구매',
  category: 'coin',
  aliases: ['매수'],
  execute: async ({msg, args}) => {
    const id = msg.author.id
    const user = await gambling.findOne({id})
    const stock = user.stock
    const coinName = args[1]
    const userCoin = stock.filter((element: { name: string }) => element.name == coinName)[0]
    const apiOptions = {
      uri: `https://crix-api-endpoint.upbit.com/v1/crix/candles/days/?code=CRIX.UPBIT.${client.coin.get(coinName)}&count=1&to`,
      method: 'GET',
      json: true
    }
    const coin = await requestGet(apiOptions)
    console.log(coin)
    if (!coin)
      return msg.reply('정확한 코인을 입력해주시기바랍니다.')
    const count = parseFloat(args[2]) 
    if (!Number.isInteger(count) || count <= 0)
      return msg.reply('정확한 구매 수량을 입력해주시기바랍니다.')
    const coinMoney = coin[0].tradePrice
    const wholeMoney = coinMoney * count
    if (user.money < wholeMoney)
      return msg.reply(`현재 잔액보다 사려는 수량이 많습니다. \n현재 잔액: ${user.money.toLocaleString()}원\n사려는 금액: ${wholeMoney.toLocaleString()}원(개당 ${coinMoney.toLocaleString()}원)`)
    
    if (userCoin) {
      const moneyAve = (userCoin.money * userCoin.count + wholeMoney) / (userCoin.count + count)
      gambling.updateOne({id, stock: userCoin}, {$set: {'stock.$.money': moneyAve}, $inc: {'stock.$.count': count, money: Math.round(-wholeMoney)}}).then(() => {
        msg.reply(`성공적으로 ${coinName} ${count.toLocaleString()}개를 ${wholeMoney.toLocaleString()}원(개당 ${coinMoney.toLocaleString()}원)에 추가로 구매했습니다!\n현재 평단가: ${userCoin.money.toLocaleString()}원 -> ${(Math.floor(moneyAve * 100) / 100).toLocaleString()}원\n현재 구매량: ${userCoin.count}개 -> ${(userCoin.count + count).toLocaleString()}개`)
      })
    } else {
      const stockObject = {
        name: coinName,
        count: count,
        money: coinMoney
      }
      gambling.updateOne({id}, {$push: {stock: stockObject}, $inc: {money: Math.round(-wholeMoney)}}).then(() => {
        msg.reply(`성공적으로 ${coinName} ${count.toLocaleString()}개를 ${wholeMoney.toLocaleString()}원(개당 ${coinMoney.toLocaleString()}원)에 구매했습니다!`)
      })
    }
  }
}