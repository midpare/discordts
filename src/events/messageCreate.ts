import { CommandType } from '../util/types/command';
import { ExtendClient } from '../structures/Client';
import { gambling } from '../models/gambling';
import { Message } from 'discord.js';

export = {
  name: 'messageCreate',
  event: async (msg: Message) => {
    const client = msg.client
    if (!(client instanceof ExtendClient))
      return

    const prefix = process.env.PREFIX || '';
    if (msg.author.bot || msg.author.id === client.user?.id || !msg.content.startsWith(prefix))
      return;

    const id = msg.author.id;
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const getCmd = (start: number, end: number) => {
      return client.commands.get(args.slice(start, end).join(' ').toLowerCase());
    }
    let command: CommandType | undefined;
    if (getCmd(0, 2)) {
      command = getCmd(0, 2);
      args.splice(0, 2);
    } else {
      command = getCmd(0, 1);
      args.splice(0, 1);
    }

    if (!command)
      return msg.reply(`정확한 명령어를 입력해주시기 바랍니다.\n${prefix}help`);

    const gambChannel1 = client.channels.cache.get('910521119877005367');
    const gambChannel2 = client.channels.cache.get('915212166330736691');
    const musicChannel = client.channels.cache.get('910521119877005366');
    const cmdChannel = client.channels.cache.get('932162287224127520');
    const botTestChannel = client.channels.cache.get('910521119877005368');

    if (msg.channel != botTestChannel) {
      switch (command.category) {
        case '도박':
        case '베팅':
        case '코인':
          if (msg.channel != gambChannel1 && msg.channel != gambChannel2)
            return msg.reply('이 명령어는 도박방에서만 사용할 수 있습니다.');

          const user = await gambling.findOne({ id });
          if (command.name != '가입' && !user)
            return msg.reply('가입되지 않은 유저입니다 !가입 을 통해 가입해주시기 바랍니다.');
          break;
        case '노래':
          if (msg.channel != musicChannel)
            return msg.reply('이 명령어는 노래방에서만 사용할 수 있습니다.');
          break;
        case '기본':
        case '관리자':
          break;
        default:
          if (msg.channel != cmdChannel)
            return msg.reply('이 명령어는 명령어사용방에서만 사용할 수 있습니다.');
          break;
      }
    }
    try {
      command.execute({ msg, args, client });
    } catch (error) {
      console.error(error);
    }
  },
}