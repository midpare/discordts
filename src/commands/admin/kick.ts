import { Command } from '../../managers/Commands';
import { TextChannel } from 'discord.js';

export default new Command({
  name: 'kick',
  aliases: ['킥', '강퇴'],
  category: '관리자',
  usage: 'kick <유저> [사유]',
  description: '서버에서 맨션한 <유저>를 강퇴합니다.',
  execute: async ({ msg, args, client }) => {
    if (!msg.member?.permissions.has('KICK_MEMBERS'))
      return msg.reply(client.messages.missingPermissionUser);

    const channel = <TextChannel>client.channels.cache.get('910521119877005363');

    const target = msg.mentions.members?.first();
    const reason = !args[1] ? client.messages.none : args.slice(1).join(' ');
    if (!target)
      return msg.reply(client.messages.admin.kick.missingMentionUser);
    if (target.permissions.has('KICK_MEMBERS'))
      return msg.reply(client.messages.admin.kick.missingPermissionTarget);

    target.kick(reason);
    channel.send(client.messages.admin.kick.success(target.user, reason));
    msg.delete();
  },
});


