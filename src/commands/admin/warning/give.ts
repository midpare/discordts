import { Command } from '../../../managers/Commands';
import { warning } from '../../../models/warning';
import { TextChannel } from 'discord.js';

export default new Command({
  name: '경고 부여',
  aliases: ['경고 주기'],
  category: '관리자',
  usage: '경고 부여 <유저> <횟수> [사유]',
  description: '유저에게 경고를 부여합니다.',
  execute: async ({ msg, args, client }) => {
    if (!msg.member?.roles.cache.has('910521119713394745') && !msg.member?.roles.cache.has('910521119713394744')) {
      msg.reply(client.messages.missingPermissionUser);
      return;
    }

    const target = msg.mentions.members?.first();
    const count = parseFloat(args[1]);
    const channel = <TextChannel>client.channels.cache.get('910521119877005363');

    if (!target) {
      msg.reply(client.messages.admin.warning.give.missingMentionUser);
      return;
    }

    if (count <= 0 || !Number.isInteger(count)) {
      msg.reply(client.messages.naturalNumber);
      return;
    }

    if (count > 10) {
      msg.reply(client.messages.admin.warning.give.overNumber);
      return;
    }

    const id = target.id;
    const name = target.user.username;
    const user = await client.models.warning.findOne({ id });
    const reason = !args[2] ? client.messages.none : args.slice(2).join(' ');

    if (!user) {
      const newUser = new warning({ id, name, warning: count })
      await newUser.save();
      channel.send(client.messages.admin.warning.give.success(target.user, count, count, reason));
    } else {
      (await client.models.warning.updateOne({ id }, { $inc: { warning: count } }, { upsert: true })).matchedCount;
      channel.send(client.messages.admin.warning.give.success(target.user, count, user.warning + count, reason));
    }

    msg.delete();
  },
});