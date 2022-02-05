import { Command } from '../../structures/Commands';
import { messages } from '../../util/language/message';
import { client } from '../../structures/Client';
import { TextChannel } from 'discord.js';

export default new Command({
  name: 'kick',
  aliases: ['킥', '강퇴'],
  category: '관리자',
  usage: 'kick <유저> [사유]',
  description: '서버에서 맨션한 <유저>를 강퇴합니다.',
  execute: async ({ msg, args }) => {
    if (!msg.member.permissions.has('KICK_MEMBERS'))
      return msg.reply(messages.missingPermissionUser);

    const channel = <TextChannel>client.channels.cache.get('910521119877005363');

    const target = msg.mentions.members?.first();
    const reason = !args[1] ? messages.none : args.slice(1).join(' ');
    if (!target)
      return msg.reply(messages.admin.kick.missingMentionUser);
    if (target.permissions.has('KICK_MEMBERS'))
      return msg.reply(messages.admin.kick.missingPermissionTarget);

    target.kick(reason);
    channel.send(messages.admin.kick.success(target.user, reason));
    msg.delete();
  },
});


