import { CommandType } from "../../../typings/command"
import { gambling } from "../../../models/gambling"
import { dateCal } from "../../../handler/function"

export = <CommandType> {
  name: '파산',
  category: 'gambling',
  use: '파산',
  description: '모든 돈과 빚을 0원으로 만들고 3일간 도박을 하지 못합니다.',
  execute: async ({msg, args}) => {
    const id = msg.author.id
    const user = await gambling.findOne({id})
    const date = new Date()
    const today = await dateCal(date, 0)
    gambling.updateOne({id}, {$set: {bankruptcy: today, money: 0, debt: 0}}).then(() => {
      msg.reply(`성공적으로 ${user.name}님이 파산했습니다!`)
    })
  }
}