import { Command } from '../../structures/Commands';
import { messages } from '../../util/language/message';
import { client } from '../../structures/Client';
import { TextChannel } from 'discord.js';

export default new Command({
  name: 'ban',
  aliases: ['밴', '벤', '차단'],
  category: '관리자',
  usage: 'ban <유저> [사유]',
  description: '서버에서 맨션한 <유저>를 차단합니다.',
  execute: async ({ msg, args }) => {
    if (!msg.member.permissions.has('BAN_MEMBERS'))
      return msg.reply(messages.missingPermissionUser);

    const channel = <TextChannel>client.channels.cache.get('910521119877005363');
    const target = msg.mentions.members?.first();
    const reason = !args[1] ? messages.none : args.slice(1).join(' ');

    if (!target)
      return msg.reply(messages.admin.ban.missingMentionUser);

    if (target.permissions.has('BAN_MEMBERS'))
      return msg.reply(messages.admin.ban.missingPermissionTarget);

    target.ban({ reason });
    channel.send(messages.admin.ban.success(target.user, reason));
    msg.delete();
  },
});

