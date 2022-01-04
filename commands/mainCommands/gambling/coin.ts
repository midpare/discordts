import { client } from '../../../contexts/client';
import { Command } from '../../../contexts/commands';

export default new Command({
  name: '코인',
  category: 'gambling',
  subCategory: 'coin',
  usage: '코인',
  description: '코인명령어를 사용합니다.',
  execute: async ({msg, args}) => {
    const command = client.subCommands.get('coin')?.get(args[0]);
    const alias = client.subAliases.get('coin')?.get(args[0]);
    if (command) {
      command.execute({msg, args});
    } else if (alias) {
      alias.execute({msg, args});
    } else return;
  },
});