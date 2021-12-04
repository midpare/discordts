import { gambling } from '../../../models/gambling'
import { commandType } from '../../../typings/command'

export = <commandType> {
  name : '출석체크',
  execute: async ({msg, args}) => {
    const id = msg.author.id
    const user = await gambling.findOne({id})
    
    if (!user)
    return msg.reply('가입되지 않은 유저입니다 !가입 을 통해 가입해주시기 바랍니다.')

    const today = new Date()
    const date = '' + today.getFullYear() + today.getMonth() + today.getDate()
    
    if (user.date == parseFloat(date)) 
      return msg.reply('오늘은 이미 받았습니다.')

    const money = Math.floor(Math.random() * (50000) + 50000);
    gambling.updateOne({id}, {$inc : {money}, $set: {date}})
    .then(() => msg.reply(`${money.toLocaleString()}원이 지급됐습니다!\n${user.name}의 현재 잔액은 ${user.money.toLocaleString()} -> ${(user.money + money).toLocaleString()} 원입니다.`)) 
  }
}