import { TextChannel, PermissionFlagsBits, ApplicationCommandOptionType, GuildMember } from 'discord.js';
import ms from 'ms';
import { SlashCommand } from '../../managers/SlashCommand';
import { Utils } from '../../structures/Utils';

export default new SlashCommand({
  name: '차단',
  aliases: ['ban', '밴', '벤'],
  category: '관리자',
  usage: '차단 <유저> [시간] [사유]',
  description: '서버에서 맨션한 <유저>를 차단합니다.',
  options: [
    {
      name: '유저',
      description: '차단할 유저를 입력합니다.',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: '시간',
      description: '차단할 시간을 입력합니다.',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: '사유',
      description: '사유를 입력합니다.',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  defaultMemberPermissions: PermissionFlagsBits.BanMembers,
  execute: async ({ interaction, options, client }) => {
    const channel = <TextChannel>client.channels.cache.get('1001317081175826482');
    const target = options.getMember('유저');
    const time = options.getString('시간');
    const reason = options.getString('사유') ?? '없음';

    if (!(target instanceof GuildMember)) {
      Utils.reply(interaction, '정확한 유저를 입력해주시기 바랍니다.');
      return;
    }

    if (time && ms(time)) {
      client.models.config.updateOne({ id: target.id }, {$set: { banTime: ms(time)}})      
    }
    
    if (target.permissions.has(PermissionFlagsBits.BanMembers)) {
      Utils.reply(interaction,client.messages.admin.ban.missingPermissionTarget);
      return;
    }
    
    interaction.guild?.members.ban(target, { reason })
    channel.send(client.messages.admin.ban.success(target.user, reason));
    Utils.reply(interaction, `성공적으로 ${target.user.username}님을 차단했습니다! `);
  },
});

