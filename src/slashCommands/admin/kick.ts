import { TextChannel, PermissionFlagsBits, ApplicationCommandOptionType, GuildMember } from 'discord.js';
import { SlashCommand } from '../../managers/SlashCommand';
import { Utils } from '../../structures/Utils';

export default new SlashCommand({
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
  defaultMemberPermissions: PermissionFlagsBits.KickMembers,
  execute: async ({ interaction, options, client }) => {
    const channel = <TextChannel>client.channels.cache.get('910521119877005363');

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


