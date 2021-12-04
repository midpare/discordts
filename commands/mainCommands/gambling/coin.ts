import client from "../../../clients/client";
import { gambling } from "../../../models/gambling";
import { commandType } from "../../../typings/command";

export = <commandType> {
  name: '코인',
  execute: async ({msg, args}) => {
    const id = msg.author.id
    const user = await gambling.findOne({id})

    if (!user)
      return msg.reply('가입되지 않은 유저입니다 !가입 을 통해 가입해주시기 바랍니다')  

    const commands = client.subCommands.get('coin').get(args[0])
    const alias = client.subAliases.get('coin').get(args[0])
    if (commands) {
      commands.execute({msg, args})
    } else if (alias) {
      alias.execute({msg, args})
    } else return
  }
}