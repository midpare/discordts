import { Command } from '../../../managers/Commands';
import { warning } from '../../../models/warning';
import { TextChannel } from 'discord.js';

export default new Command({
  name: '경고 차감',
  category: '관리자',
  usage: '경고 차감 <유저> <횟수> [사유]',
  description: '유저의 경고를 차감합니다.',
  execute: async ({ msg, args, client }) => {
    if (!msg.member?.roles.cache.has('910521119713394745') && !msg.member?.roles.cache.has('910521119713394744'))
      return msg.reply(client.messages.missingPermissionUser);

    const target = msg.mentions.members?.first();
    const count = parseFloat(args[1]);
    const channel = <TextChannel>client.channels.cache.get('910521119877005363');

    if (!target)
       return msg.reply(client.messages.admin.warning.deduction.missingMentionUser);

    if (count <= 0 || !Number.isInteger(count)) {
      return msg.reply(client.messages.naturalNumber); 
    }

    const id = target.id;
    const user = await warning.findOne({ id });
    const reason = !args[2] ? client.messages.none : args.slice(2).join(' ');
    if (!user || user.warning <= 0)
      return msg.reply(client.messages.admin.warning.deduction.noneWarning);

    if (user.warning - count < 0)
      return msg.reply(client.messages.admin.warning.deduction.overWarning);

    (await warning.updateOne({ id }, { $inc: { warning: -count } })).matchedCount;
    channel.send(client.messages.admin.warning.deduction.success(target.user, count, user.warning - count, reason));
    msg.delete();
  },
});