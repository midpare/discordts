import { extendMessage } from "../typings/command"
import client  from "../clients/client"
import 'dotenv/config'
const prefix = process.env.PREFIX || ''

export = {
  name: 'messageCreate',
  event: async (msg: extendMessage) => {
    if (msg.author.bot || msg.author.id === client.user.id || !msg.content.startsWith(prefix)) return

    const [cmd, ...args] = msg.content.slice(prefix.length).trim().split(/ +/g)
    const command = client.mainCommands.get(cmd.toLowerCase())
    const aliase = client.mainAliases.get(cmd.toLowerCase())
    if (command) {
      command.execute({msg, args})
    } else if (aliase){
      aliase.execute({msg, args})
    } else return
  }
}