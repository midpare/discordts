import { Command } from '../../../structures/Commands';

export default new Command({
  name: 'ban',
  aliases: ['밴', '벤', '차단'],
  category: '관리자',
  usage: 'ban <유저> <사유>',
  description: '서버에서 맨션한 <유저>를 차단합니다.',
  execute: async ({ msg, args }) => {
    if (!msg.member.permissions.has('BAN_MEMBERS'))
      return msg.reply('이 명령어를 사용할 권한이 없습니다.');

    const target = msg.mentions.members?.first();
    const reason = !args[1] ? '없음' : args.slice(1).join(' ');

    if (!target)
      return msg.reply('차단할 유저를 맨션해주시기 바랍니다.');
      
    if (target.permissions.has('BAN_MEMBERS'))
      return msg.reply('이 유저는 차단할 수 없습니다.');

    target.ban({ reason });
    msg.channel.send('```' + `처벌 대상: ${target.user.username}#${target.user.discriminator}\n가한 처벌: 차단\n처벌 사유: ${reason}` + '```');
    msg.delete();
    
  },
});

