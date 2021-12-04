import { gambling } from '../../../models/gambling'
import { commandType } from '../../../typings/command'

export = <commandType> {
  name : '빚',
  execute: async ({msg, args}) => {
    const id = msg.author.id 
    const user = await gambling.findOne({id})
    if (!user)
      return msg.reply('가입되지 않은 유저입니다 !가입 을 통해 가입해주시기 바랍니다')
  
    msg.reply(`${user.name} 님의 빚은 ${user.debt.toLocaleString()}원입니다.`)
  }
}