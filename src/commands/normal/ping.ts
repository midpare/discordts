import { Command } from '../../structures/Commands';

export default new Command({
  name: 'ping',
  category: '기본',
  usage: 'ping',
  description: '봇의 작동가능여부를 확인합니다.',
  execute: ({msg, args}) => {
    msg.reply('pong!');
  },
});
