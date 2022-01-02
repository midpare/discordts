import { gambling } from '../../../models/gambling'
import { CommandType } from '../../../typings/command'

export = <CommandType> {
  name: '가입',
  category: 'gambling',
  usage: '가입',
  description: '도박 관련 명령어를 사용할수있게 가입을 합니다.',
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