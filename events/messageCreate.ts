import { ExtendMessage } from "../typings/command"
import { client } from "../structures/client"
import { gambling } from "../models/gambling"
import { dateCal } from "../handler/function"

export = {
  name: 'messageCreate',
  event: async (msg: ExtendMessage) => {
    const prefix = process.env.PREFIX || ''
    if (msg.author.bot || msg.author.id === client.user.id || !msg.content.startsWith(prefix)) return

    const id = msg.author.id
    const [cmd, ...args] = msg.content.slice(prefix.length).trim().split(/ +/g)
    const command = client.mainCommands.get(cmd.toLowerCase())
    const aliase = client.mainAliases.get(cmd.toLowerCase())
    const date = new Date()
    const today = dateCal(date, 0)
    if (command) {
      const user = await gambling.findOne({id})
      if (command.category == 'gambling' && command.name != '가입') {
        if (!user)
          return msg.reply('가입되지 않은 유저입니다 !가입 을 통해 가입해주시기 바랍니다.')

        if (user.bankruptcy && parseFloat(today) - parseFloat(user.bankruptcy) < 3)
          return msg.reply(`파산한지 3일이 지나지 않은 유저는 도박을 할 수 없습니다. 파산일${user.bankruptcy}`)
      }
      command.execute({ msg, args })
    } else if (aliase) {
      aliase.execute({ msg, args })
    } else return
  }
}