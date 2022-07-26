import { Command } from '../../managers/Commands';
import { TextChannel, PermissionFlagsBits } from 'discord.js';

export default new Command({
  name: 'ban',
  aliases: ['밴', '벤', '차단'],
  category: '관리자',
  usage: 'ban <유저> [사유]',
  description: '서버에서 맨션한 <유저>를 차단합니다.',
  execute: async ({ msg, args, client }) => {
    if (!msg.member?.permissions.has(PermissionFlagsBits.BanMembers))
      return msg.reply(client.messages.missingPermissionUser);

    const channel = <TextChannel>client.channels.cache.get('910521119877005363');
    const target = msg.mentions.members?.first();
    const reason = !args[1] ? client.messages.none : args.slice(1).join(' ');

    if (!target)
      return msg.reply(client.messages.admin.ban.missingMentionUser);

    if (target.permissions.has(PermissionFlagsBits.BanMembers))
      return msg.reply(client.messages.admin.ban.missingPermissionTarget);

    target.ban({ reason });
    channel.send(client.messages.admin.ban.success(target.user, reason));
    msg.delete();
  },
});

