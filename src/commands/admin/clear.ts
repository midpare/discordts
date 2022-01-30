import { Command } from '../../structures/Commands';
import { message } from '../../util/language/message';

export default new Command({
  name: 'clear',
  aliases: ['클리어'],
  category: '관리자',
  usage: 'clear <숫자>',
  description: '메시지를 보낸 채팅방에 <숫자>만큼의 채팅을 지웁니다.',
  execute: async ({ msg, args }) => {
    if (!msg.member.permissions.has('MANAGE_MESSAGES'))
      return msg.reply(message.missingPermissionUser);

    const count = parseFloat(args[0]);
    if (!Number.isInteger(count))
      return msg.reply(message.naturalNumber);

    if (count < 0 || count > 99)
      return msg.reply(message.betweenNumber(1, 99));

    msg.channel.bulkDelete(count + 1);
    const send = await msg.reply(message.admin.clear.success(count));
    setTimeout(() => {
      send.delete();
    }, 1500);
  },
});
