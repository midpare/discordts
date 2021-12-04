import { gambling } from '../../../models/gambling'
import { commandType } from '../../../typings/command'

export = <commandType> {
  name : '올인',
  execute: async ({msg, args}) => {
    const id = msg.author.id
    const user = await gambling.findOne({id})

    if (!user) 
      return msg.reply('가입되지 않은 유저입니다 !가입 을 통해 가입해주시기 바랍니다.')
    if (user.money == 0) 
      return msg.reply('돈이 없을때는 도박을 할 수 없습니다.')
  
    const random = Math.floor(Math.random() * 2)

    if (random == 1) {
      gambling.updateOne({id}, {$mul: {money: 2}})
      .then(() => msg.reply(`도박에 성공하셨습니다! ${user.money.toLocaleString()}원이 지급되었습니다. \n현재 잔액: ${user.money.toLocaleString()}원 -> ${(user.money * 2).toLocaleString()}원`))
    } else if (random == 0) {
      gambling.updateOne({id}, {$set: {money: 0}})
      .then(() => msg.reply(`도박에 실패하셨습니다! 모든 돈을 잃었습니다. \n현재 잔액 ${user.money.toLocaleString()}원 -> 0원`))
    }   
  }
}