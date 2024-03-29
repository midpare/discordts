import { TextChannel, PermissionFlagsBits, ApplicationCommandOptionType, GuildMember } from 'discord.js';
import ms from 'ms';
import { Command } from '../../managers/Command';
import { Utils } from '../../structures/Utils';

export default new Command({
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
  default_member_permissions: PermissionFlagsBits.BanMembers,
  execute: async ({ interaction, options, client }) => {
    const { guild, guildId } = interaction;

    if (!guildId)
      return 0;

    const guildData = await client.models.guild.findOne({ id: guildId });
    const channel = <TextChannel>interaction.guild?.channels.cache.get(guildData.punishment);

    if (!channel) {
      Utils.reply(interaction, '처벌내역방을 등록해주시기 바랍니다.');
      return 0;
    }

    const target = options.getMember('유저');
    const time = options.getString('시간');
    const reason = options.getString('사유') ?? '없음';

    if (!(target instanceof GuildMember)) {
      Utils.reply(interaction, '정확한 유저를 입력해주시기 바랍니다.');
      return 0;
    }

    if (target.permissions.has(PermissionFlagsBits.BanMembers)) {
      Utils.reply(interaction, '이 유저는 차단할 수 없습니다.')
      return 0;
    }

    if (target.permissions.has(PermissionFlagsBits.BanMembers)) {
      Utils.reply(interaction,client.messages.admin.ban.missingPermissionTarget);
      return 0;
    }
    
    if (time && ms(time)) {
      setTimeout(() => {
        guild?.members.unban(target)
      }, ms(time));
    }
    
    interaction.guild?.members.ban(target, { reason });
    channel.send(client.messages.admin.ban.success(target.user, reason, time ?? '없음'));
    Utils.reply(interaction, `성공적으로 ${target.user.username}님을 차단했습니다! `);
    return 1;
  },
});

