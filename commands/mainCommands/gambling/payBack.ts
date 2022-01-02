import { gambling } from "../../../models/gambling";
import { CommandType } from "../../../typings/command";

export = <CommandType> {
  name: '빚갚기',
  aliases: ['돈갚기'],
  category: 'gambling',
  usage: '빚갚기 <돈>',
  description: '자신의 빚을 갚습니다.',
  execute: async ({msg, args}) => {
    const id = msg.author.id
    const user = await gambling.findOne({id})
    if (!args[0])
      return msg.reply('정확한 금액을 입력해주시기바랍니다.')
    const money = parseFloat(args[0])
    if (!Number.isInteger(money) || money <= 0) 
      return msg.reply('정확한 금액을 입력해주시기바랍니다.')
    if (user.money < money)
      return msg.reply(`갚으려는 금액이 현재 금액보다 많습니다.\n현재 잔액: ${user.money}원`)
    if (user.debt < money)
      return msg.reply(`갚으려는 금액이 현재 빚보다 많습니다.\n현재 빚:${user.debt}원`)
    
    gambling.updateOne({id}, {$inc: {money: -money, debt: -money}}).then(() => {
      msg.reply(`성공적으로 빚을 ${money.toLocaleString()}원 갚았습니다!\n현재 빚: ${user.debt.toLocaleString()}원 -> ${(user.debt - money).toLocaleString()}원`)
    })
  }
}   