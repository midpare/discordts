import { gambling } from "../../../models/gambling";
import { commandType } from "../../../typings/command";

export = <commandType> {
  name: '송금',
  aliases: ['이체', '돈보내기'],
  execute: async ({msg, args}) => {
    const id = msg.author.id
    const user = await gambling.findOne({id})
    if (!user)
      return msg.reply('가입되지 않은 유저입니다 !가입 을 통해 가입해주시기 바랍니다')

    const target = msg.mentions.members?.first()
    if (!target)
      return msg.reply('송금할 유저를 맨션해주시기바랍니다.')

    const targetUser = await gambling.findOne({id: target.id})
    if (!targetUser)
      return msg.reply('송금할 유저가 가입을 하지 않았습니다.')

    if (!args[1])
      return msg.reply('송금할 금액을 입력해주시기바랍니다.')

    const money = parseFloat(args[1])
    if (!Number.isInteger(money) || money <= 0)
      return msg.reply('정확한 금액을 입력해주시기바랍니다.')
    if (user.money < money)
      return msg.reply(`송금하려는 금액이 현재 잔액보다 많습니다\n현재 잔액: ${user.money}원`)
    ;(await gambling.updateOne({id}, {$inc: {money : -money}})).matchedCount
    ;(await gambling.updateOne({id: target.id}, {$inc: {money : money}})).matchedCount
    msg.reply(`성공적으로 ${target.user.username}님에게 ${money.toLocaleString()}원을 송금했습니다!`)
  }
}