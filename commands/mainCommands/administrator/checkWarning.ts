import { warning } from '../../../models/warning'
import { commandType } from '../../../typings/command'

export = <commandType> {
  name: "경고확인",
  execute: async ({msg, args}) => {
    const id = msg.author.id
    const user = await warning.findOne({id})
    msg.reply(`${user.name} 님의 경고 횟수는 ${user.warning.toString()}회 입니다.`)
  }
}

  