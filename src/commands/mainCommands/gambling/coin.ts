import { client } from '../../../structures/Client';
import { Command } from '../../../structures/Commands';

export default new Command({
  name: '코인',
  category: '코인',
  usage: '코인',
  description: '코인 관련 명령어를 사용합니다.',
  execute: async ({ msg, args }) => {
    const command = client.subCommands.get('코인')?.get(args[0]);
    const alias = client.subAliases.get('코인')?.get(args[0]);
    if (command) {
      command.execute({ msg, args });
    } else if (alias) {
      alias.execute({ msg, args });
    } else return;
  },
});