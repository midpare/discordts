import { client } from "../../../structures/Client";
import { Command } from "../../../structures/Commands";

export default new Command({
  name: '내전',
  category: '내전',
  usage: '내전',
  description: '내전 관련 명령어를 사용합니다.',
  execute: async ({ msg, args }) => {
    const command = client.subCommands.get('내전')?.get(args[0]);
    const alias = client.subAliases.get('내전')?.get(args[0]);
    if (command) {
      command.execute({ msg, args });
    } else if (alias) {
      alias.execute({ msg, args });
    } else return;
  },
});