import client from "../../../clients/client";
import { gambling } from "../../../models/gambling";
import { commandType } from "../../../typings/command";

export = <commandType> {
  name: '코인',
  category: 'gambling',
  subCategory: 'coin',
  use: '코인',
  description: '코인명령어를 사용합니다.',
  execute: async ({msg, args}) => {
    const commands = client.subCommands.get('coin').get(args[0])
    const alias = client.subAliases.get('coin').get(args[0])
    if (commands) {
      commands.execute({msg, args})
    } else if (alias) {
      alias.execute({msg, args})
    } else return
  }
}