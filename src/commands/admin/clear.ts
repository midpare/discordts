import { NewsChannel, TextChannel, ThreadChannel, PermissionFlagsBits } from 'discord.js';
import { Command } from '../../managers/Commands';

export default new Command({
  name: 'clear',
  aliases: ['클리어'],
  category: '관리자',
  usage: 'clear <숫자>',
  description: '메시지를 보낸 채팅방에 <숫자>만큼의 채팅을 지웁니다.',
  execute: async ({ msg, args, client }) => {
    if (!msg.member?.permissions.has(PermissionFlagsBits.ManageMessages))
      return msg.reply(client.messages.missingPermissionUser);

    const count = parseFloat(args[0]);
    if (!Number.isInteger(count))
      return msg.reply(client.messages.naturalNumber);

    if (count < 0 || count > 99)
      return msg.reply(client.messages.betweenNumber(1, 99));

    if (!msg.channel.isTextBased() || msg.channel.isVoiceBased() || msg.channel.isDMBased())
      return;
      
    msg.channel.bulkDelete(count + 1);
    const send = await msg.reply(client.messages.admin.clear.success(count));
    setTimeout(() => {
      send.delete();
    }, 1500);
  },
});
