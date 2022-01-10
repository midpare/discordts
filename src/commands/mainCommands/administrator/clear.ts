import { Command } from '../../../structures/Commands';

export default new Command({
  name: 'clear',
  aliases: ['클리어'],
  category: '관리자',
  usage: 'clear <숫자>',
  description: '메시지를 보낸 채팅방에 <숫자>만큼의 채팅을 지웁니다.',
  execute: async ({ msg, args }) => {    
    if (!msg.member.permissions.has('MANAGE_MESSAGES'))
      return msg.reply('당신은 이 명령어를 사용할 권한이 없습니다.');
      
    const count = parseFloat(args[0]);
    if (!Number.isInteger(count))
      return msg.reply('정확한 자연수를 입력해주시기 바랍니다.\n !clear <숫자>');

    if (count < 0 || count > 99)
      return msg.reply('1에서 99사이의 수를 입력해주시기 바랍니다. \n !clear <숫자>');

    msg.channel.bulkDelete(count + 1);
  },
});
