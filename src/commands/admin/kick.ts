import { TextChannel, PermissionFlagsBits, ApplicationCommandOptionType, GuildMember } from 'discord.js';
import { Command } from '../../managers/Command';
import { Utils } from '../../structures/Utils';

export default new Command({
  name: '강퇴',
  aliases: ['킥', 'kick'],
  category: '관리자',
  usage: '강퇴 <유저> [사유]',
  description: '서버에서 맨션한 <유저>를 강퇴합니다.',
  options: [
    {
      name: '유저',
      description: '강퇴할 유저를 입력합니다.',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: '사유',
      description: '사유를 입력합니다.',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  default_member_permissions: PermissionFlagsBits.KickMembers,
  execute: async ({ interaction, options, client }) => {
    const { guildId } = interaction;

    if (!guildId)
      return;

    const guild = await client.models.guild.findOne({ id: guildId });
    const channel = <TextChannel>client.guilds.cache.get(guildId)?.channels.cache.get(guild.punishment);

    if (!channel) {
      Utils.reply(interaction, '처벌내역방을 등록해주시기 바랍니다.');
      return;
    }
    
    const target = options.getMember('유저')
    const reason = options.getString('사유') ?? '';

    if (!(target instanceof GuildMember)) {
      Utils.reply(interaction, client.messages.admin.kick.missingMentionUser);
      return;
    } 
    
    if (target.permissions.has(PermissionFlagsBits.KickMembers)) {
      interaction.reply(client.messages.admin.kick.missingPermissionTarget);
      return;
    }

    target.kick(reason);
    channel.send(client.messages.admin.kick.success(target.user, reason));
    Utils.reply(interaction, `성공적으로 ${target.displayName}님을 강퇴했습니다!`);
  },
});


