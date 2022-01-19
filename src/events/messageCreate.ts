import { ExtendMessage } from '../typings/Command';
import { client } from '../structures/Client';
import { gambling } from '../models/gambling';

export = {
  name: 'messageCreate',
  event: async (msg: ExtendMessage) => {
    const prefix = process.env.PREFIX || '';
    if (msg.author.bot || msg.author.id === client.user.id || !msg.content.startsWith(prefix)) return;

    const id = msg.author.id;
    const [cmd, ...args] = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = client.mainCommands.get(cmd.toLowerCase());
    const aliase = client.mainAliases.get(cmd.toLowerCase());
    const gambChannel1 = client.channels.cache.get('910521119877005367');
    const gambChannel2 = client.channels.cache.get('915212166330736691');
    const musicChannel = client.channels.cache.get('910521119877005366');
    const cmdChannel = client.channels.cache.get('932162287224127520');
    try {
      if (command) {
        switch (command.category) {
          case '도박' || '코인' || '베팅':
            if (msg.channel != gambChannel1 && msg.channel != gambChannel2)
              return msg.reply('이 명령어는 도박방에서만 사용할 수 있습니다.');

            const user = await gambling.findOne({ id });
            if (!user)
              return msg.reply('가입되지 않은 유저입니다 !가입 을 통해 가입해주시기 바랍니다.');
            break;
          case '노래':
            if (msg.channel != musicChannel)
              return msg.reply('이 명령어는 노래방에서만 사용할 수 있습니다.');
            break;
          default:
            if (msg.channel != cmdChannel)
              return msg.reply('이 명령어는 명령어사용방에서만 사용할 수 있습니다.');
            break;
        }
        command.execute({ msg, args });
      } else if (aliase) {
        aliase.execute({ msg, args });
      } else
        return msg.reply(`정확한 명령어를 입력해주시기 바랍니다.\n${prefix}help`)
    } catch (error) {
      console.error(error);
    }
  },
}