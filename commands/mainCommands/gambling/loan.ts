import { gambling } from "../../../models/gambling";
import { commandType } from "../../../typings/command";

export = <commandType> {
  name: '대출',
  execute: async ({msg, args}) => {
    const id = msg.author.id
    const user = await gambling.findOne({id})
    if (!user)
      return msg.reply('가입되지 않은 유저입니다 !가입 을 통해 가입해주시기 바랍니다.')
    if (!args[0]) 
      return msg.reply('정확한 금액을 입력해주시기바랍니다.')
    const debt = parseFloat(args[0])
    if (!Number.isInteger(debt) || debt <= 0) 
      return msg.reply('정확한 금액를 입력해주시기바랍니다')
    
    if (user.debt + debt > 1000000) 
      return msg.reply(`100만원을 초과하는 빚은 빌릴수 없습니다.`)
      
    gambling.updateOne({id}, {$inc: {debt, money: debt}}).then(() => {
      msg.reply(`성공적으로 ${debt.toLocaleString()}원을 대출했습니다!\n 현재 대출금액 ${user.debt.toLocaleString()}원 -> ${(user.debt + debt).toLocaleString()}원`)
    })
  }
} 