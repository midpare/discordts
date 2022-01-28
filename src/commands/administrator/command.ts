import { client } from '../../structures/Client';
import { Command } from '../../structures/Commands';

export default new Command({
  name: 'cmd',
  category: '관리자',
  description: '명령어를 정지하고 다시 가동합니다.',
  usage: 'cmd 정지/가동 <명령어>',
  execute: ({ msg, args }) => {
    if (msg.author.id != '446068726849208341')
      return msg.reply('개발자 전용 명령어입니다.');
    
    const command = client.commands.get(args[1]);
    switch(args[0]) {
      case '정지':
        if (!command)
          return msg.reply('정지할 정확한 명령어를 입력해주시기 바랍니다.');
        
        if (command.stopping)
          return msg.reply('이 명령어는 이미 정지돼있습니다.');
        
        command.stopping = true;
        msg.reply(`성공적으로 ${command.name}명령어를 정지했습니다!`);
        break;
      case '가동':
        if (!command)
          return msg.reply('시작할 정확한 명령어를 입력해주시기 바랍니다.');
        
        if (!command.stopping)
          return msg.reply('이 명령어는 현재 이미 가동중입니다.');
        
        command.stopping = false;
        msg.reply(`성공적으로 ${command.name}명령어를 가동했습니다!`);
        break;
      default:
        msg.reply('정지/가동 중 입력해주시기 바랍니다.');
        break;
    }
  }
})