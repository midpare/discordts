import { Client } from '../structures/Client';
import { Message } from 'discord.js';
import { Command } from '../managers/Commands';
import { Event } from '../managers/Event';

export default new Event({
  name: 'messageCreate',
  execute: async (msg: Message) => {
    const client = msg.client
    if (!(client instanceof Client))
      return

    const prefix = process.env.PREFIX || '';
    if (msg.author.bot || msg.author.id === client.user?.id || !msg.content.startsWith(prefix))
      return;

    const id = msg.author.id;
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const time = new Date().getTime();

    const getCmd = (start: number, end: number) => {
      return client.commands.get(args.slice(start, end).join(' ').toLowerCase());
    }
    let cmd: Command | undefined;
    if (getCmd(0, 2)) {
      cmd = getCmd(0, 2);
      args.splice(0, 2);
    } else {
      cmd = getCmd(0, 1);
      args.splice(0, 1);
    }

    if (!cmd)
      return msg.reply(`정확한 명령어를 입력해주시기 바랍니다.\n${prefix}help`);

    const gambChannel = client.channels.cache.get('1000969429158481980');
    const cmdChannel = client.channels.cache.get('1000969483462123591');
    const botTestChannel = client.channels.cache.get('910521119877005368');

    if (msg.channel != botTestChannel) {
      switch (cmd.category) {
        case '도박':
        case '베팅':
        case '코인':
          if (msg.channel != gambChannel)
            return msg.reply('이 명령어는 도박방에서만 사용할 수 있습니다.');

          const user = await client.models.gambling.findOne({ id });
          if (cmd.name != '가입' && !user)
            return msg.reply('가입되지 않은 유저입니다 !가입 을 통해 가입해주시기 바랍니다.');

          if (time - user.bankruptcy < 60 * 60 * 1000)
            return msg.reply('파산한 유저는 한시간동안 도박을 할 수 없습니다.');

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
      cmd.execute({ msg, args, client });
    } catch (error) {
      console.error(error);
    }
  },
});