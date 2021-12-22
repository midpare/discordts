import { client } from "../../../context/client";
import { gambling } from "../../../models/gambling";
import { CommandType } from "../../../typings/command";

export = <CommandType> {
  name: '코인',
  category: 'gambling',
  subCategory: 'coin',
  use: '코인',
  description: '코인명령어를 사용합니다.',
  execute: async ({msg, args}) => {
    const command = client.subCommands.get('coin')?.get(args[0])
    const alias = client.subAliases.get('coin')?.get(args[0])
    if (command) {
      command.execute({msg, args})
    } else if (alias) {
      alias.execute({msg, args})
    } else return
  }
}