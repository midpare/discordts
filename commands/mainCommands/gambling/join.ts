import { gambling } from '../../../models/gambling'
import { commandType } from '../../../typings/command'

export = <commandType> {
  name: "가입",
  execute: async ({msg, args}) => {
    const id = msg.author.id
    const name = msg.author.username
    const today = new Date() 
    const date = '' + today.getFullYear() + today.getMonth() + (today.getDate() - 1)
    const user = await gambling.findOne({id})
    if (user)
      return msg.reply('이미 가입된 유저입니다.')

    const newUser = new gambling({id, name, date, money: 0, debt: 0, gamLevel: 1})
    newUser.save()
    .then(() => msg.reply('성공적으로 가입이 완료되었습니다!'))
  }
}