import { Command } from '../../../structures/Commands';
import { warning } from '../../../models/warning';
import { client } from '../../../structures/Client';
import { TextChannel } from 'discord.js';
import { messages } from '../../../util/language/message';

export default new Command({
  name: '경고 부여',
  aliases: ['경고 주기'],
  category: '관리자',
  usage: '경고 부여 <유저> <횟수> [사유]',
  description: '유저에게 경고를 부여합니다.',
  execute: async ({ msg, args }) => {
    if (!msg.member.roles.cache.has('910521119713394745') && !msg.member.roles.cache.has('910521119713394744'))
      return msg.reply(messages.missingPermissionUser);

    const target = msg.mentions.members?.first();
    const count = parseFloat(args[1]);
    const channel = <TextChannel>client.channels.cache.get('910521119877005363');
    
    if (!target)
      return msg.reply(messages.admin.warning.give.missingMentionUser);


    if (count <= 0 || !Number.isInteger(count))
      return msg.reply(messages.naturalNumber);

    if (count > 10)
      return msg.reply(messages.admin.warning.give.overNumber);

    const id = target.id;
    const name = target.user.username;
    const user = await warning.findOne({ id });
    const reason = !args[2] ? messages.none : args.slice(2).join(' ');

    if (!user) {
      const newUser = new warning({ id, name, warning: count })
      await newUser.save();
      channel.send(messages.admin.warning.give.success(target.user, count, count, reason));
      return;
    }

    (await warning.updateOne({ id }, { $inc: { warning: count } }, { upsert: true })).matchedCount;
    channel.send(messages.admin.warning.give.success(target.user, count, user.warning + count, reason));
  },
});