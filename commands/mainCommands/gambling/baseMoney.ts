import { gambling } from '../../../models/gambling'
import { commandType } from '../../../typings/command'

export = <commandType> {
  name: '기초자금',
  aliases: ['초기자금'],
  execute: async ({msg, args}) => {
    const id = msg.author.id
    const user = await gambling.findOne({id})

    if (!user)
      return msg.reply('가입되지 않은 유저입니다 !가입 을 통해 가입해주시기 바랍니다')
    
    if (user.money != 0 || user.stock[0]) 
      return msg.reply('보유하신 자산이 있어 기초자금을 지급할 수 없습니다.')
    
    const date = new Date()
    const second = date.getTime()
    const coolTime = 60
    if (user.baseMoneyCoolTime) {
      const userCoolTime = user.baseMoneyCoolTime
      if ((second - userCoolTime) / 1000 < coolTime)
        return msg.reply(`명령어의 쿨타임이 ${Math.ceil(coolTime - (second - userCoolTime) / 1000)}초 남았습니다.`)
    }
    
    const baseMoney = 25000
    gambling.updateOne({id}, {$set : {money : baseMoney, baseMoneyCoolTime: second}})
    .then(() => msg.reply(`기초자금 ${baseMoney.toLocaleString()}원이 지급되었습니다!`))
  }
}