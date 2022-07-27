import { NewsChannel, TextChannel, ThreadChannel, PermissionFlagsBits } from 'discord.js';
import { Command } from '../../managers/Commands';

export default new Command({
  name: 'clear',
  aliases: ['클리어'],
  category: '관리자',
  usage: 'clear <숫자>',
  description: '메시지를 보낸 채팅방에 <숫자>만큼의 채팅을 지웁니다.',
  execute: async ({ msg, args, client }) => {
    if (!msg.member?.permissions.has(PermissionFlagsBits.ManageMessages)) {
      msg.reply(client.messages.missingPermissionUser);
      return;
    }

    const count = parseFloat(args[0]);
    if (!Number.isInteger(count)) {
      msg.reply(client.messages.naturalNumber);
      return;
    }

    if (count < 0 || count > 99) {
      msg.reply(client.messages.betweenNumber(1, 99));
      return;
    }

    if (!msg.channel.isTextBased() || msg.channel.isVoiceBased() || msg.channel.isDMBased())
      return;

    const target = msg.mentions.members?.first();

    let msgs = await msg.channel.messages.fetch({ limit: 99 });
    if (target) {
      msgs = msgs.filter(msg => msg.author.id == target.user.id)
    }

    if (msgs.size > count) {
      for (let i = 0; i < msgs.size - count; i++) {
        const key = msgs.keyAt(i + count);
        if (key)
          msgs.delete(key);
      }
    }
 
    if (msgs.size == 0)
      return;

    if (msgs.size == 1) {
      msgs.first()?.delete();
      return;
    }

    msg.channel.bulkDelete(msgs, true);
    const sent = await msg.channel.send(client.messages.admin.clear.success(count))
    
    setTimeout(() => {
      sent.delete();
    }, 1500);
  },
});
